import { useEffect } from 'react';

import { Modal as AntdModal } from 'antd';
import { create } from 'zustand/react';

import './modal.css';

interface ModalStore {
  show?: boolean;
}

const useModalStore = create<StoreProps<ModalStore> & ModalStore>((set) => ({
  show: false,
  set: (data) => set((state) => ({ ...data, set: state.set }), true),
}));

export function useModal() {
  const { show, set } = useModalStore();

  const open = () => {
    set({ show: true });
  };

  const close = () => {
    set({ show: false });
  };

  return { show, open, close };
}

interface ModalProps {}

function Modal({}: ModalProps) {
  const { show, close } = useModal();

  const onClose = () => {
    close();
  };

  // 스크롤 상단 고정
  useEffect(() => {
    if (show) {
      document.body.classList.add('ant-modal-opened');
    }

    return () => {
      document.body.classList.remove('ant-modal-opened');
    };
  }, [show]);

  return (
    <AntdModal
      className="modal"
      title={<></>}
      centered
      open={show}
      onCancel={onClose}
      onClose={onClose}
      maskClosable={false}
      closable={false}
      footer={false}
      styles={{
        content: {
          padding: 0,
        },
      }}
      transitionName="fadeIn"
    ></AntdModal>
  );
}

export default Modal;

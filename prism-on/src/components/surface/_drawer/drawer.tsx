import React, { useEffect } from 'react';

import { Drawer as AntdDrawer, Button, Space } from 'antd';
import { create } from 'zustand/react';

import './drawer.css';

interface DrawerStore {
  show?: boolean;
}

const useDrawerStore = create<StoreProps<DrawerStore> & DrawerStore>((set) => ({
  show: false,
  set: (data) => set((state) => ({ ...data, set: state.set }), true),
}));

export function useDrawer() {
  const { show, set } = useDrawerStore();

  const open = () => {
    set({ show: true });
  };

  const close = () => {
    set({ show: false });
  };

  return { show, open, close };
}

interface DrawerProps {}

function Drawer({}: DrawerProps) {
  const { show, close } = useDrawer();

  const onClose = () => {
    close();
  };

  // 스크롤 상단 고정
  useEffect(() => {
    if (show) {
      document.body.classList.add('ant-drawer-opened');
    }

    document.querySelector('.ant-drawer .ant-drawer-body')?.scrollTo(0, 0);

    return () => {
      document.body.classList.remove('ant-drawer-opened');
    };
  }, [show]);

  return (
    <AntdDrawer
      title=""
      keyboard={false}
      maskClosable={false}
      closeIcon={false}
      onClose={onClose}
      open={show}
      width={800}
      extra={
        <Space>
          <Button size="small" onClick={() => onClose()}>
            취소
          </Button>
          <Button
            size="small"
            type="primary"
            htmlType="submit"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"
                />
              </svg>
            }
          >
            저장
          </Button>
        </Space>
      }
    ></AntdDrawer>
  );
}

export default Drawer;

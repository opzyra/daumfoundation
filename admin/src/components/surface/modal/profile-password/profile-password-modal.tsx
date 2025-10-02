import { useEffect } from 'react';
import { Controller } from 'react-hook-form';

import { useRouter } from 'next/router';

import { Button, Input, Modal } from 'antd';
import { useForm } from 'src/hooks/use-form';
import { create } from 'zustand/react';

import { useSession } from 'src/components/provider/session-provider/session-provider';
import { Form, FormAction, FormItem } from 'src/components/shared/form/form';

import { yup } from 'src/library/yup';

import * as adminService from 'src/service/admin';

import './profile-password-modal.css';

const schema = yup.object({
  oldPassword: yup.string().required('필수 항목입니다.'),
  newPassword: yup
    .string()
    .required('필수 항목입니다.')
    .min(8, '비밀번호는 8자리 이상 입력해주세요.')
    .max(20, '비밀번호는 20자리 이하로 입력해주세요.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/,
      '최소 1개 이상 포함된 영어,숫자 조합으로 입력해주세요.',
    ),
  confirmPassword: yup
    .string()
    .required('필수 항목입니다.')
    .oneOf([yup.ref('newPassword')], '입력하신 비밀번호가 일치하지 않습니다.'),
});

interface ProfilePasswordModalStore {
  show?: boolean;
}

const useProfilePasswordModalStore = create<
  StoreProps<ProfilePasswordModalStore> & ProfilePasswordModalStore
>((set) => ({
  show: false,
  set: (data) => set((state) => ({ ...data, set: state.set }), true),
}));

export function useProfilePasswordModal() {
  const { show, set } = useProfilePasswordModalStore();

  const open = () => {
    set({ show: true });
  };

  const close = () => {
    set({ show: false });
  };

  return { show, open, close };
}

interface ProfilePasswordModalProps {}

export function ProfilePasswordModal({}: ProfilePasswordModalProps) {
  const router = useRouter();
  const { logout } = useSession();

  const { show, close } = useProfilePasswordModal();

  const { formId, control, errors, handleSubmit, reset, clearErrors } =
    useForm<any>({
      id: 'PasswordForm',
      schema,
      onSubmit: async (form) => {
        await adminService.adminPasswordAdmin(form);
        await logout();
        router.push('/auth');
      },
    });

  const onCancel = () => {
    close();
  };

  // 데이터 초기화
  useEffect(() => {
    clearErrors();
    reset({});
  }, [show]);

  return (
    <Modal
      title="비밀번호 변경"
      width={480}
      centered
      open={show}
      onCancel={onCancel}
      closable={false}
      maskClosable={false}
      keyboard={false}
      footer={false}
      transitionName="fadeIn"
    >
      <div className="profile-password-modal">
        <form id={formId} onSubmit={handleSubmit}>
          <Form layout="vertical" variant="borderless" size="small">
            <FormItem
              label="현재 비밀번호"
              message={{ error: errors.oldPassword }}
            >
              <Controller
                control={control}
                name="oldPassword"
                render={({ field }) => (
                  <Input.Password
                    size="small"
                    status={errors[field.name] && 'error'}
                    {...field}
                  />
                )}
              />
            </FormItem>
            <FormItem
              label="새 비밀번호"
              message={{ error: errors.newPassword }}
            >
              <Controller
                control={control}
                name="newPassword"
                render={({ field }) => (
                  <Input.Password
                    size="small"
                    status={errors[field.name] && 'error'}
                    {...field}
                  />
                )}
              />
            </FormItem>
            <FormItem
              label="새 비밀번호 확인"
              message={{ error: errors.confirmPassword }}
            >
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <Input.Password
                    size="small"
                    status={errors[field.name] && 'error'}
                    {...field}
                  />
                )}
              />
            </FormItem>
            <FormAction>
              <Button
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                    />
                  </svg>
                }
                htmlType="button"
                onClick={onCancel}
              >
                취소
              </Button>
              <Button
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
                    ></path>
                  </svg>
                }
                form={formId}
                type="primary"
                htmlType="submit"
              >
                변경 후 로그인
              </Button>
            </FormAction>
          </Form>
        </form>
      </div>
    </Modal>
  );
}

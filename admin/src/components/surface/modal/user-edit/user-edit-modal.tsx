import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Input, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import { useForm } from 'src/hooks/use-form';
import { create } from 'zustand/react';

import { Form, FormAction, FormItem } from 'src/components/shared/form/form';

import toastr from 'src/library/toastr';
import { yup } from 'src/library/yup';

import { UserAdminParam, UserDto } from 'src/service/model';
import * as userService from 'src/service/user';

import './user-edit-modal.css';

const schema = (mode?: UserEditModeType) => {
  if (mode === 'status') {
    return yup.object({
      status: yup.string().required('필수 항목입니다.'),
      disableReason: yup.string().when(['status'], {
        is: (status: string) => status === 'disable',
        then: (schema) => schema.required('필수 항목입니다.'),
        otherwise: (schema) => schema.notRequired(),
      }),
    });
  }

  return yup.object({
    memo: yup.string().notRequired(),
  });
};

type UserEditModeType = 'status' | 'memo';

interface UserEditModalStore {
  mode?: UserEditModeType;
  user?: UserDto;
  show?: boolean;
}

const useUserEditModalStore = create<
  StoreProps<UserEditModalStore> & UserEditModalStore
>((set) => ({
  show: false,
  set: (data) => set((state) => ({ ...data, set: state.set }), true),
}));

export function useUserEditModal() {
  const store = useUserEditModalStore();
  const { set } = store;

  const open = (param: Omit<UserEditModalStore, 'show'>) => {
    set({ show: true, ...param });
  };

  const close = () => {
    set({ show: false });
  };

  return { open, close, ...store };
}

interface UserEditModalProps {}

export function UserEditModal({}: UserEditModalProps) {
  const queryClient = useQueryClient();
  const { mode, user, show, close } = useUserEditModal();

  const {
    formId,
    control,
    errors,
    formValues,
    handleSubmit,
    reset,
    clearErrors,
  } = useForm<UserAdminParam>({
    id: 'UserEditForm',
    schema: schema(mode),
    onSubmit: async (form) => {
      if (!user) return;

      await userService.adminUpdateUser(user.id, form);

      const adminFindOneUserQueryKey = userService.getAdminFindOneUserQueryKey(
        user.id,
      );
      const adminSearchUserQueryKey = userService.getAdminSearchUserQueryKey();

      await queryClient.invalidateQueries(adminFindOneUserQueryKey);
      await queryClient.invalidateQueries(adminSearchUserQueryKey);

      toastr.update();
      onCancel();
    },
  });

  const onCancel = () => {
    close();
  };

  // 데이터 초기화
  useEffect(() => {
    clearErrors();
    reset(
      user
        ? {
            ...user,
          }
        : {},
    );
  }, [show, user]);

  return (
    <Modal
      title={mode === 'status' ? '회원 상태 변경' : '메모 수정'}
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
      <div className="user-edit-modal">
        <form id={formId} onSubmit={handleSubmit}>
          <Form layout="vertical" variant="borderless" size="small">
            {mode === 'status' && (
              <>
                <FormItem label="상태" message={{ error: errors.status }}>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <Select {...field}>
                        <Select.Option value="active">활성화</Select.Option>
                        <Select.Option value="disable">이용 정지</Select.Option>
                      </Select>
                    )}
                  />
                </FormItem>
                {formValues.status === 'disable' && (
                  <>
                    <FormItem
                      label="정지 사유"
                      message={{ error: errors.disableReason }}
                    >
                      <Controller
                        control={control}
                        name="disableReason"
                        render={({ field }) => (
                          <Input.TextArea
                            status={errors.disableReason && 'error'}
                            autoSize={{ minRows: 4, maxRows: 4 }}
                            {...field}
                          />
                        )}
                      />
                    </FormItem>
                    {user?.disableAt && (
                      <FormItem label="정지 일시">
                        {dayjs(user.disableAt).format('YYYY-MM-DD HH:mm')}
                      </FormItem>
                    )}
                  </>
                )}
              </>
            )}

            {mode === 'memo' && (
              <>
                <FormItem message={{ error: errors.memo }}>
                  <Controller
                    control={control}
                    name="memo"
                    render={({ field }) => (
                      <Input.TextArea
                        status={errors.memo && 'error'}
                        autoSize={{ minRows: 4, maxRows: 4 }}
                        {...field}
                      />
                    )}
                  />
                </FormItem>
              </>
            )}

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
                저장
              </Button>
            </FormAction>
          </Form>
        </form>
      </div>
    </Modal>
  );
}

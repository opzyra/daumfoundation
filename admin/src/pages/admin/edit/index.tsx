import React, { ReactElement, useCallback, useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Popconfirm, Select, Typography } from 'antd';
import lodash from 'lodash';
import { useForm } from 'src/hooks/use-form';

import { AdminLayout } from 'src/components/layout/admin-layout/admin-layout';
import { AdminGuard } from 'src/components/provider/session-provider/session-guard';
import alert from 'src/components/shared/alert/alert';
import {
  Form,
  FormAction,
  FormItem,
  FormSection,
} from 'src/components/shared/form/form';
import { Page } from 'src/components/shared/page/page';
import Status from 'src/components/ui/status/status';

import parser from 'src/library/parser';
import toastr from 'src/library/toastr';
import { yup } from 'src/library/yup';

import * as adminService from 'src/service/admin';
import { AdminAdminParam } from 'src/service/model';

import './admin-edit.css';

interface AdminEditProps {
  id: number | undefined;
}

export const getServerSideProps: GetServerSideProps<AdminEditProps> = async (
  context,
) => {
  const queryClient = new QueryClient();

  const params = parser.paramUrl(context.params);

  return {
    props: { dehydratedState: dehydrate(queryClient), ...params },
  };
};

AdminEdit.getProvider = (page: ReactElement) => {
  return <AdminGuard role="master">{page}</AdminGuard>;
};

const schema = (context: any) =>
  yup.object({
    username: yup.string().required('필수 항목입니다.'),
    password: yup.string().when([], {
      is: () => !context.id,
      then: (schema) => schema.required('필수 항목입니다.'),
      otherwise: (schema) => schema.notRequired(),
    }),
    name: yup.string().notRequired(),
    phone: yup.string().notRequired(),
    email: yup.string().email('올바른 이메일 형식이 아닙니다.').notRequired(),
    status: yup.string().required('필수 항목입니다.'),
    memo: yup.string().notRequired(),
    role: yup.string().required('필수 항목입니다.'),
  });

function AdminEdit(props: AdminEditProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const id = props.id || 0;
  const mode = id !== 0 ? 'update' : 'create';

  const { data: admin } = adminService.useAdminFindOneAdmin(id, {
    query: {
      enabled: mode === 'update',
    },
  });

  const {
    formId,
    control,
    handleSubmit,
    clearErrors,
    setError,
    errors,
    formValues,
  } = useForm<AdminAdminParam>({
    id: 'AdminForm',
    schema: schema({ id }),
    value: admin,
    onSubmit: async (form) => {
      let dto = admin;

      if (dto) {
        await adminService.adminUpdateAdmin(dto.id, form);
      }

      if (!dto) {
        dto = await adminService.adminCreateAdmin(form);
      }

      const adminFindOneAdminQueryKey =
        adminService.getAdminFindOneAdminQueryKey(dto.id);
      const adminSearchAdminQueryKey =
        adminService.getAdminSearchAdminQueryKey();

      await queryClient.invalidateQueries(adminFindOneAdminQueryKey);
      await queryClient.invalidateQueries(adminSearchAdminQueryKey);

      await router.push('/admin');
      mode === 'create' ? toastr.create() : toastr.update();
    },
  });

  const passwordErrors = useMemo(() => {
    const fields = [
      'min', // 최소 8자리
      'combination', // 문자 조합
    ];

    const { password } = formValues;

    if (!password) return fields;

    // 1. 최소 8자리
    if (password.length >= 8) {
      const idx = fields.indexOf('min');
      if (idx > -1) fields.splice(idx, 1);
    }

    // 2. 문자 조합 (두 종류 이상)
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);
    const categoryCount = [hasLower, hasUpper, hasNumber, hasSpecial].filter(
      Boolean,
    ).length;

    if (categoryCount >= 2) {
      const idx = fields.indexOf('combination');
      if (idx > -1) fields.splice(idx, 1);
    }

    return fields;
  }, [formValues]);

  // 아이디 중복 검사
  const onUsername = useCallback(
    lodash.debounce(async (e) => {
      const username = e.target.value;
      clearErrors('username');
      if (username === '') return;

      const usernameAdmin = await adminService.adminUsernameAdmin({
        username,
      });

      if (admin && admin.username === username) {
        return;
      }

      if (usernameAdmin) {
        setError('username', { message: '이미 등록된 아이디 입니다.' });
      }
    }, 300),
    [],
  );

  // 비밀번호 초기화
  const onPasswordReset = async () => {
    if (!admin) return;

    const reset = await adminService.adminResetPasswordAdmin({
      id: admin.id,
    });

    alert.info({
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4 22V8h3V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h3v14zm2-2h12V10H6zm6-3q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6zM6 20V10z"
          ></path>
        </svg>
      ),
      title: '비밀번호 초기화',
      content: (
        <div className="admin-password-alert">
          <div className="text">
            아래의 비밀번호로 초기화 되었습니다.
            <br />
            로그인하여 새로운 비밀번호를 설정해주세요.
          </div>
          <div className="copy">
            <Typography.Paragraph copyable>
              {reset.temporal}
            </Typography.Paragraph>
          </div>
        </div>
      ),
    });
  };

  return (
    <AdminLayout
      metadata={{
        gnb: 'system',
        lnb: 'admin',
      }}
      active="admin"
    >
      <Page title={`관리자 계정 ${mode === 'create' ? '등록' : '수정'}`}>
        <div className="pg-admin-edit">
          <form id={formId} onSubmit={handleSubmit}>
            <Form>
              <FormSection>
                <FormItem
                  label="아이디"
                  required
                  message={{ error: errors.username }}
                  width={280}
                >
                  <Controller
                    control={control}
                    name="username"
                    render={({ field }) => (
                      <Input
                        placeholder="아이디를 입력해주세요"
                        status={errors.username && 'error'}
                        {...field}
                        onChange={(e) => {
                          onUsername(e);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                </FormItem>
                {mode === 'update' && (
                  <FormItem label="비밀번호">
                    <Popconfirm
                      title={
                        <>
                          기존 비밀번호는 사용할수 없습니다.
                          <br />
                          초기화 하시겠습니까?
                        </>
                      }
                      placement="bottomLeft"
                      onConfirm={onPasswordReset}
                    >
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
                              d="M12.917 13A6.002 6.002 0 0 1 1 12a6 6 0 0 1 11.917-1H23v2h-2v4h-2v-4h-2v4h-2v-4zM7 16a4 4 0 1 0 0-8a4 4 0 0 0 0 8"
                            />
                          </svg>
                        }
                      >
                        비밀번호 초기화
                      </Button>
                    </Popconfirm>
                  </FormItem>
                )}
                {mode === 'create' && (
                  <FormItem
                    label="비밀번호"
                    required
                    message={{
                      errors: (
                        <>
                          <Status
                            variant="icon"
                            type={
                              passwordErrors.includes('min')
                                ? 'error'
                                : 'success'
                            }
                          >
                            최소 8자 이상이어야 합니다.
                          </Status>
                          <Status
                            variant="icon"
                            type={
                              passwordErrors.includes('combination')
                                ? 'error'
                                : 'success'
                            }
                          >
                            영문 대소문자, 숫자, 특수문자 중 최소 2종류 이상을
                            조합해야 합니다.
                          </Status>
                        </>
                      ),
                    }}
                    width={280}
                  >
                    <Controller
                      control={control}
                      name="password"
                      render={({ field }) => (
                        <Input.Password
                          placeholder="비밀번호를 입력해주세요"
                          status={errors.username && 'error'}
                          {...field}
                        />
                      )}
                    />
                  </FormItem>
                )}

                <FormItem
                  label="이름"
                  message={{ error: errors.name }}
                  width={280}
                >
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <Input
                        placeholder="이름를 입력해주세요"
                        status={errors.name && 'error'}
                        {...field}
                      />
                    )}
                  />
                </FormItem>
                <FormItem
                  label="연락처"
                  message={{ error: errors.phone }}
                  width={480}
                >
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <Input
                        placeholder="연락처를 입력해주세요"
                        status={errors.phone && 'error'}
                        {...field}
                      />
                    )}
                  />
                </FormItem>
                <FormItem
                  label="이메일"
                  message={{ error: errors.email }}
                  width={480}
                >
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <Input
                        placeholder="이메일을 입력해주세요"
                        status={errors.email && 'error'}
                        {...field}
                      />
                    )}
                  />
                </FormItem>
              </FormSection>
              <FormSection title="메타 정보">
                <FormItem
                  label="상태"
                  message={{ error: errors.status }}
                  width={260}
                  required
                >
                  <Controller
                    name="status"
                    control={control}
                    defaultValue="active"
                    render={({ field }) => (
                      <Select
                        status={errors.status && 'error'}
                        defaultValue="active"
                        {...field}
                      >
                        <Select.Option value="active">활성화</Select.Option>
                        <Select.Option value="disable">정지</Select.Option>
                      </Select>
                    )}
                  />
                </FormItem>
                <FormItem
                  label="권한"
                  message={{ error: errors.role }}
                  width={260}
                  required
                >
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select
                        placeholder="권한을 선택해주세요."
                        status={errors.role && 'error'}
                        disabled={admin?.role === 'master'}
                        {...field}
                      >
                        <Select.Option value={'master'} disabled>
                          관리자
                        </Select.Option>
                        <Select.Option value={'manager'}>매니저</Select.Option>
                      </Select>
                    )}
                  />
                </FormItem>
                <FormItem label="메모" message={{ error: errors.memo }}>
                  <Controller
                    name="memo"
                    control={control}
                    render={({ field }) => (
                      <Input.TextArea
                        status={errors.memo && 'error'}
                        autoSize={{ minRows: 6, maxRows: 6 }}
                        {...field}
                      />
                    )}
                  />
                </FormItem>
              </FormSection>
              <FormAction>
                <Button
                  type="primary"
                  form={formId}
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
              </FormAction>
            </Form>
          </form>
        </div>
      </Page>
    </AdminLayout>
  );
}

export default AdminEdit;

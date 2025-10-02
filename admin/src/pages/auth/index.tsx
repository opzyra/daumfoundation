import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { QueryClient, dehydrate } from '@tanstack/react-query';
import { Button, Checkbox, Input, Popover } from 'antd';
import { useForm } from 'src/hooks/use-form';

import { useSession } from 'src/components/provider/session-provider/session-provider';

import toastr from 'src/library/toastr';
import { yup } from 'src/library/yup';

import * as adminService from 'src/service/admin';
import { AdminAuthAdminParam } from 'src/service/model';

import './auth.css';

interface AuthProps {}

export const getServerSideProps: GetServerSideProps<AuthProps> = async () => {
  const queryClient = new QueryClient();

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

Auth.getProvider = (page: ReactElement) => {
  return <>{page}</>;
};

const schema = yup.object({
  username: yup.string().required('아이디를 입력해주세요.'),
  password: yup.string().required('비밀번호를 입력해주세요.'),
});

function Auth(props: AuthProps) {
  const router = useRouter();
  const { login } = useSession();

  const { formId, control, handleSubmit } = useForm<AdminAuthAdminParam>({
    id: 'AuthForm',
    schema,
    onSubmit: async (form) => {
      const admin = await adminService.adminAuthAdmin(form);

      login(admin);
      router.push('/');
    },
    onError: async (error) => {
      if (error.username) {
        toastr.validation({ content: error.username.message });
        return;
      }

      if (error.password) {
        toastr.validation({ content: error.password.message });
        return;
      }
    },
  });

  return (
    <div className="pg-auth">
      <form id={formId} onSubmit={handleSubmit}>
        <div className="auth-box">
          <div className="auth-brand">
            <img src="/images/brand.png" style={{ width: '200px' }} />
          </div>
          <div className="auth-form">
            <div className="form-item">
              <div className="form-label">
                <div className="label-text">아이디</div>
                <div className="label-action"></div>
              </div>
              <div className="form-control">
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="아이디를 입력해주세요"
                      allowClear
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <div className="form-item">
              <div className="form-label">
                <div className="label-text">비밀번호</div>
                <div className="label-action">
                  <Popover
                    trigger="click"
                    content={
                      <div className="auth-repass-popover">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 512 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M235.4 172.2c0-11.4 9.3-19.9 20.5-19.9 11.4 0 20.7 8.5 20.7 19.9s-9.3 20-20.7 20c-11.2 0-20.5-8.6-20.5-20zm1.4 35.7H275V352h-38.2V207.9z"></path>
                          <path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"></path>
                        </svg>
                        <span>시스템 관리자에게 문의해주세요</span>
                      </div>
                    }
                  >
                    비밀번호를 잊었나요?
                  </Popover>
                </div>
              </div>
              <div className="form-control">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      placeholder="비밀번호를 입력해주세요"
                      allowClear
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <div className="form-option">
              <div className="option-item">
                <Controller
                  name="reconnect"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field}>자동 로그인</Checkbox>
                  )}
                />
              </div>
            </div>
            <div className="form-action">
              <Button
                form={formId}
                htmlType="submit"
                size="large"
                type="primary"
                block
              >
                로그인
              </Button>
            </div>
          </div>
          <div className="auth-corp">© Daumfoundation org.</div>
        </div>
      </form>
    </div>
  );
}

export default Auth;

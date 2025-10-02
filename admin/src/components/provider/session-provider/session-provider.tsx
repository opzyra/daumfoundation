import React, { useEffect } from 'react';

import { router } from 'next/client';

import { Modal as AntdModal, Button } from 'antd';
import { create } from 'zustand/react';

import * as adminService from 'src/service/admin';

import './session-provider.css';

interface SessionStore {
  admin?: any;
  error?: boolean;
  fetched?: boolean;
}

const useSessionStore = create<StoreProps<SessionStore> & SessionStore>(
  (set) => ({
    fetched: false,
    error: false,
    set: (data) => set((state) => ({ ...data, set: state.set }), true),
  }),
);

export function useSession() {
  const { admin, error, fetched, set } = useSessionStore();

  const login = (admin: any) => {
    set({ admin, fetched: true });
  };

  const logout = () => {
    set({ admin: undefined, fetched: true });
  };

  const session = (admin: any) => {
    set({ admin, fetched: true });
  };

  return {
    admin,
    error,
    fetched,
    login,
    logout,
    session,
    set,
  };
}

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const { error, session, set } = useSession();

  // 세션 주입
  useEffect(() => {
    adminService.adminSessionAdmin().then((admin) => session(admin));
  }, []);

  return (
    <>
      {children}
      <AntdModal
        width="100%"
        title={<></>}
        centered
        open={error}
        onCancel={() => {
          set({ error: false });
        }}
        onClose={() => {
          set({ error: false });
        }}
        maskClosable={true}
        closable={true}
        footer={false}
        styles={{
          content: {
            padding: 0,
          },
        }}
        transitionName="fadeIn"
      >
        <div className="session-anonymous-modal">
          <div className="session-anonymous-modal-container">
            <div className="modal-head">
              <div className="head-icon">
                <div className="icon-round">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M31.8333 16C31.8333 20.7711 29.723 25.0494 26.3848 27.9523C23.6048 30.3697 19.9733 31.8333 16 31.8333C12.0266 31.8333 8.39511 30.3697 5.61514 27.9523C2.27697 25.0494 0.166626 20.7711 0.166626 16C0.166626 7.25545 7.25545 0.166626 16 0.166626C24.7445 0.166626 31.8333 7.25545 31.8333 16ZM16 27.0833C18.7813 27.0833 21.3234 26.0588 23.2694 24.3666C23.4934 24.1718 23.7095 23.9681 23.9172 23.7562C22.2057 20.988 19.2985 19.1666 16 19.1666C12.7015 19.1666 9.79425 20.988 8.08281 23.7561C8.29048 23.9681 8.5066 24.1718 8.73062 24.3666C10.6766 26.0588 13.2187 27.0833 16 27.0833ZM16 16C18.6233 16 20.75 13.8733 20.75 11.25C20.75 8.62661 18.6233 6.49996 16 6.49996C13.3766 6.49996 11.25 8.62661 11.25 11.25C11.25 13.8733 13.3766 16 16 16Z"
                      fill="#1034E5"
                    />
                  </svg>
                </div>
              </div>
              <div className="head-text">세션이 만료되었습니다</div>
            </div>
            <div className="modal-action">
              <Button
                type="primary"
                size="large"
                block
                onClick={async () => {
                  set({ error: false });
                  await router.push(`/login`);
                }}
              >
                로그인
              </Button>
            </div>
          </div>
        </div>
      </AntdModal>
    </>
  );
}

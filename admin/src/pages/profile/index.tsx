import { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { QueryClient, dehydrate } from '@tanstack/react-query';
import { Button, Input } from 'antd';
import { useForm } from 'src/hooks/use-form';
import RegexUtils from 'src/utils/regex.utils';

import { AdminLayout } from 'src/components/layout/admin-layout/admin-layout';
import { AdminGuard } from 'src/components/provider/session-provider/session-guard';
import { useSession } from 'src/components/provider/session-provider/session-provider';
import {
  ProfilePasswordModal,
  useProfilePasswordModal,
} from 'src/components/surface/modal/profile-password/profile-password-modal';

import toastr from 'src/library/toastr';
import { yup } from 'src/library/yup';

import * as adminService from 'src/service/admin';
import { AdminProfileAdminParam } from 'src/service/model';

import './profile.css';

interface ProfileProps {}

export const getServerSideProps: GetServerSideProps<
  ProfileProps
> = async () => {
  const queryClient = new QueryClient();

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

Profile.getProvider = (page: ReactElement) => {
  return <AdminGuard>{page}</AdminGuard>;
};

const schema = yup.object({
  name: yup.string().required('이름을 입력해주세요'),
  phone: yup
    .string()
    .matches(RegexUtils.phone, {
      message: '연락처 형식이 올바르지 않습니다',
      excludeEmptyString: true,
    })
    .notRequired(),
  email: yup
    .string()
    .matches(RegexUtils.email, {
      message: '이메일 형식이 올바르지 않습니다',
      excludeEmptyString: true,
    })
    .notRequired(),
});

function Profile(props: ProfileProps) {
  const router = useRouter();

  const { admin, session } = useSession();

  const { open: openPasswordModal } = useProfilePasswordModal();

  const { formId, control, handleSubmit, errors, reset } =
    useForm<AdminProfileAdminParam>({
      id: 'ProfileForm',
      schema,
      value: admin,
      onSubmit: async (form) => {
        await adminService.adminProfileAdmin(form);
        const admin = await adminService.adminSessionAdmin();
        session(admin);
        toastr.update();
      },
      onError: (error) => {
        Object.values(error).forEach((value) => {
          if (value.message) {
            toastr.error({ content: value.message });
            return;
          }
        });
      },
    });

  return (
    <AdminLayout size="full" aside={false}>
      <div className="pg-profile" style={{ height: '100%' }}>
        <form id={formId} onSubmit={handleSubmit}>
          <div className="profile-form">
            <div className="form-head">
              <div className="head-title">개인정보 수정</div>
              <div className="head-action">
                <Button
                  onClick={() => openPasswordModal()}
                  size="small"
                  icon={
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
                  }
                >
                  비밀번호 변경
                </Button>
              </div>
            </div>
            <div className="form-item">
              <div className="form-label">
                이름<strong>*</strong>
              </div>
              <div className="form-control">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      status={errors[field.name] && 'error'}
                      placeholder="이름을 입력해주세요"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <div className="form-item">
              <div className="form-label">연락처</div>
              <div className="form-control">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      status={errors[field.name] && 'error'}
                      placeholder="연락처를 입력해주세요"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <div className="form-item">
              <div className="form-label">이메일</div>
              <div className="form-control">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      status={errors[field.name] && 'error'}
                      placeholder="이메일을 입력해주세요"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <div className="form-action">
              <Button
                onClick={() => {
                  router.back();
                }}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
                    ></path>
                  </svg>
                }
              >
                뒤로가기
              </Button>
              <Button
                form={formId}
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
                    ></path>
                  </svg>
                }
              >
                저장
              </Button>
            </div>
          </div>
        </form>
      </div>

      <ProfilePasswordModal />
    </AdminLayout>
  );
}

export default Profile;

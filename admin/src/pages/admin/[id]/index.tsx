import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { QueryClient, dehydrate } from '@tanstack/react-query';
import { Button } from 'antd';

import { AdminLayout } from 'src/components/layout/admin-layout/admin-layout';
import { AdminGuard } from 'src/components/provider/session-provider/session-guard';
import {
  Form,
  FormAction,
  FormItem,
  FormSection,
} from 'src/components/shared/form/form';
import { Page } from 'src/components/shared/page/page';
import Html from 'src/components/ui/html/html';
import Status from 'src/components/ui/status/status';

import parser from 'src/library/parser';

import * as adminService from 'src/service/admin';

import './admin-detail.css';

interface AdminDetailProps {
  id: number | undefined;
}

export const getServerSideProps: GetServerSideProps<AdminDetailProps> = async (
  context,
) => {
  const queryClient = new QueryClient();

  const params = parser.paramUrl(context.params);

  return {
    props: { dehydratedState: dehydrate(queryClient), ...params },
  };
};

AdminDetail.getProvider = (page: ReactElement) => {
  return <AdminGuard role="master">{page}</AdminGuard>;
};

function AdminDetail(props: AdminDetailProps) {
  const router = useRouter();

  const id = props.id || 0;

  const { data: admin } = adminService.useAdminFindOneAdmin(id);

  return (
    <AdminLayout
      metadata={{
        gnb: 'system',
        lnb: 'admin',
      }}
      active="admin"
    >
      {admin && (
        <Page title={`관리자 계정 정보`}>
          <div className="pg-admin-detail">
            <Form type="detail">
              <FormSection>
                <FormItem label="아이디" width={280}>
                  {admin.username}
                </FormItem>
                <FormItem label="이름" width={280}>
                  {admin.name}
                </FormItem>
                <FormItem label="연락처" width={480}>
                  {admin.phone}
                </FormItem>
                <FormItem label="이메일" width={480}>
                  {admin.email}
                </FormItem>
              </FormSection>
              <FormSection title="메타 정보">
                <FormItem label="상태" width={260}>
                  {admin.status === 'active' && (
                    <Status variant="pulse" type="success">
                      활성화
                    </Status>
                  )}
                  {admin.status === 'disable' && (
                    <Status variant="pulse" type="error">
                      정지
                    </Status>
                  )}
                </FormItem>
                <FormItem label="권한" width={260}>
                  {admin.role === 'master' && '관리자'}
                  {admin.role === 'manager' && '매니저'}
                </FormItem>
                <FormItem label="메모">
                  <Html
                    textarea
                    value={admin.memo}
                    style={{ minHeight: '200px' }}
                  />
                </FormItem>
              </FormSection>
              <FormAction>
                <Button
                  type="primary"
                  onClick={() => router.push(`/admin/edit/${admin.id}`)}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="currentColor"
                        d="M964.256 49.664C929.392 16.256 890.933-.672 849.877-.672c-64.192 0-111.024 41.472-123.841 54.176c-18.032 17.856-633.152 633.2-633.152 633.2a33 33 0 0 0-8.447 14.592C70.565 752.559 1.077 980.016.387 982.304c-3.567 11.648-.384 24.337 8.208 32.928a32.34 32.34 0 0 0 22.831 9.44c3.312 0 6.655-.496 9.919-1.569c2.352-.767 237.136-76.655 275.775-88.19a32.74 32.74 0 0 0 13.536-8.033c24.416-24.128 598.128-591.456 636.208-630.784c39.392-40.592 58.96-82.864 58.208-125.616c-.784-42.208-21.248-82.848-60.816-120.816M715.845 155.84c16.304 3.952 54.753 16.862 94.017 56.479c39.68 40.032 50.416 85.792 52.416 96.208c-125.824 125.168-415.456 411.728-529.632 524.672c-10.544-24.56-27.584-54.144-54.993-81.76c-33.471-33.728-67.536-52.783-93.808-63.503c112.992-113.008 408.08-408.224 532-532.096M140.39 741.95c17.584 4.672 54.111 18.224 91.344 55.76c28.672 28.912 42.208 60.8 48.288 80.24c-44.48 14.304-141.872 47.92-203.76 67.872c18.336-60.336 49.311-154.304 64.128-203.872m780.031-491.584a1749 1749 0 0 1-6.065 6.16c-10.113-26.049-27.857-59.52-58.577-90.496c-31.391-31.648-63.231-50.32-88.75-61.36c2.175-2.16 3.855-3.857 4.511-4.496c3.664-3.617 36.897-35.376 78.32-35.376c23.84 0 47.248 10.88 69.617 32.32c26.511 25.424 40.175 50.512 40.624 74.592c.431 24.576-12.913 51.04-39.68 78.656"
                      ></path>
                    </svg>
                  }
                >
                  수정
                </Button>
              </FormAction>
            </Form>
          </div>
        </Page>
      )}
    </AdminLayout>
  );
}

export default AdminDetail;

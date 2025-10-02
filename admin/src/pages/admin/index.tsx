import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { QueryClient, dehydrate } from '@tanstack/react-query';
import { Button, Divider, Flex, Segmented, Select, Tag } from 'antd';
import dayjs from 'dayjs';
import lodash from 'lodash';
import { useForm } from 'src/hooks/use-form';
import NumberUtils from 'src/utils/number.utils';

import { AdminLayout } from 'src/components/layout/admin-layout/admin-layout';
import { AdminGuard } from 'src/components/provider/session-provider/session-guard';
import { Filter } from 'src/components/shared/filter';
import { Page } from 'src/components/shared/page/page';
import { TableSource } from 'src/components/shared/source';
import { Link } from 'src/components/ui/link/link';
import Status from 'src/components/ui/status/status';

import parser from 'src/library/parser';
import stc from 'src/library/stc';

import * as adminService from 'src/service/admin';
import { AdminDto, AdminSearchAdminParams } from 'src/service/model';

import './admin.css';

interface AdminProps {
  search: any;
  defaults: any;
}

export const getServerSideProps: GetServerSideProps<AdminProps> = async (
  context,
) => {
  const queryClient = new QueryClient();

  const params = parser.paramUrl(context.params);
  const queryString = lodash.omitBy(
    context.query,
    (value, key) => params[key] === value,
  );

  const defaults = {
    status: '',
    role: '',
    searchType: 'username',
    sortColumn: 'createdAt',
    sortType: 'desc',
    page: 1,
    limit: 20,
  };

  const search = parser.queryUrl(context.req.url, defaults);

  if (lodash.isEmpty(queryString)) {
    return {
      redirect: {
        destination: `${context.resolvedUrl}?${parser.queryString(search)}`,
        permanent: false,
      },
    };
  }

  return {
    props: { dehydratedState: dehydrate(queryClient), search, defaults },
  };
};

Admin.getProvider = (page: ReactElement) => {
  return <AdminGuard>{page}</AdminGuard>;
};

function Admin(props: AdminProps) {
  const router = useRouter();

  const { data: admin, isLoading } = adminService.useAdminSearchAdmin(
    props.search,
  );

  const filterForm = useForm<AdminSearchAdminParams>({
    id: 'AdminFilter',
    value: props.search,
    defaultValues: props.defaults,
  });

  return (
    <AdminLayout
      metadata={{
        gnb: 'system',
        lnb: 'admin',
      }}
      active="admin"
    >
      <Page
        title="관리자 계정"
        action={[
          <Button
            type="primary"
            key="edit"
            onClick={() => router.push('/admin/edit')}
          >
            관리자 등록
          </Button>,
        ]}
      >
        <div className="pg-admin">
          <Flex vertical gap={20}>
            <div className="admin-filter">
              <Filter
                form={filterForm}
                keys={['status']}
                search={[
                  {
                    label: '아이디',
                    value: 'username',
                  },
                  {
                    label: '이름',
                    value: 'name',
                  },
                ]}
                tabs={[
                  {
                    label: '권한',
                    render: (onChange) => (
                      <Segmented
                        value={props.search.role}
                        onChange={(value) => onChange('role', value)}
                        options={[
                          {
                            label: '전체',
                            value: '',
                          },
                          {
                            label: '관리자',
                            value: 'master',
                          },
                          {
                            label: '매니저',
                            value: 'manager',
                          },
                        ]}
                      />
                    ),
                  },
                ]}
                filter={[
                  {
                    label: '상태',
                    render: (control) => (
                      <Controller
                        name="status"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                          <Select {...field}>
                            <Select.Option value="">전체</Select.Option>
                            <Select.Option value="active">활성화</Select.Option>
                            <Select.Option value="disable">정지</Select.Option>
                          </Select>
                        )}
                      />
                    ),
                  },
                ]}
              />
            </div>
            <div className="admin-source">
              <TableSource<AdminDto>
                meta={admin?.meta}
                dataSource={admin?.items}
                loading={isLoading}
                sort={[
                  {
                    key: 'createdAt',
                    label: '등록일',
                  },
                  {
                    key: 'loginAt',
                    label: '이용일시',
                  },
                ]}
                columns={[
                  {
                    title: '번호',
                    align: 'center',
                    width: 80,
                    render: (dom, record, index) => {
                      return NumberUtils.pageNumbering(
                        index,
                        admin?.meta,
                        'asc',
                      );
                    },
                  },
                  {
                    title: '아이디',
                    width: 140,
                    dataIndex: 'username',
                  },
                  {
                    title: '상세 정보',
                    width: 'auto',
                    render: (dom, record) => {
                      return (
                        <Link route={`/admin/${record.id}`}>
                          <span>{record.name}</span>
                          <Divider type="vertical" />
                          <span>{record.phone || '연락처 미등록'}</span>
                          <Divider type="vertical" />
                          <span>{record.email || '이메일 미등록'}</span>
                        </Link>
                      );
                    },
                  },
                  {
                    title: '권한',
                    dataIndex: 'role',
                    width: 180,
                    render: (dom, record) => {
                      return (
                        <Tag
                          color={stc.generateColor(record.role)}
                          key={record.role}
                        >
                          {record.role === 'master' && '관리자'}
                          {record.role === 'manager' && '매니저'}
                          {record.role === 'aud' && '청능사'}
                        </Tag>
                      );
                    },
                  },
                  {
                    title: '계정 상태',
                    width: 100,
                    dataIndex: 'status',
                    render: (dom, record) => {
                      if (record.status === 'active') {
                        return (
                          <Status variant="pulse" type="success">
                            활성화
                          </Status>
                        );
                      }

                      if (record.status === 'disable') {
                        return (
                          <Status variant="pulse" type="error">
                            정지
                          </Status>
                        );
                      }
                    },
                  },
                  {
                    title: '이용일시',
                    width: 100,
                    dataIndex: 'loginAt',
                    responsive: ['xxl'],
                    render: (dom, record) => {
                      if (!record.loginAt) return '-';
                      return dayjs(record.loginAt).fromNow();
                    },
                  },
                  {
                    title: '등록일',
                    width: 120,
                    dataIndex: 'createdAt',
                    render: (dom, record) => {
                      if (!record.createdAt) return '-';
                      return dayjs(record.createdAt).format('YYYY-MM-DD');
                    },
                    responsive: ['xxl'],
                  },
                  {
                    title: '관리',
                    width: 80,
                    align: 'center',
                    dataIndex: 'option',
                    sorter: false,
                    render: (text, record) => {
                      return (
                        <Flex align="center" justify="center">
                          <Link
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
                                />
                              </svg>
                            }
                            type="primary"
                            variant="outline"
                            onClick={() =>
                              router.push({
                                pathname: `/admin/edit/${record.id}`,
                              })
                            }
                          />
                        </Flex>
                      );
                    },
                  },
                ]}
              />
            </div>
          </Flex>
        </div>
      </Page>
    </AdminLayout>
  );
}

export default Admin;

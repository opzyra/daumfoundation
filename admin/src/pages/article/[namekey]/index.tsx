import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query';
import { Button, Flex, Popconfirm, Segmented, Select, Tag } from 'antd';
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
import Svg from 'src/components/ui/svg/svg';

import parser from 'src/library/parser';
import toastr from 'src/library/toastr';

import * as articleService from 'src/service/article';
import { AdminSearchAdminParams, ArticleDto } from 'src/service/model';

import './article.css';

interface ArticleProps {
  search: any;
  defaults: any;
  namekey: string;
}

export const getServerSideProps: GetServerSideProps<ArticleProps> = async (
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
    group: '',
    board: params.namekey,
    searchType: 'subject',
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
    props: {
      dehydratedState: dehydrate(queryClient),
      search,
      defaults,
      namekey: params.namekey,
    },
  };
};

Article.getProvider = (page: ReactElement) => {
  return <AdminGuard>{page}</AdminGuard>;
};

function Article(props: ArticleProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: board, isLoading: boardLoading } =
    articleService.useAdminFindOneBoardArticle(props.namekey);

  const { data: article } = articleService.useAdminSearchArticle(props.search);

  const filterForm = useForm<AdminSearchAdminParams>({
    id: 'ArticleFilter',
    value: props.search,
    defaultValues: props.defaults,
  });

  return (
    <AdminLayout
      metadata={{
        gnb: 'contents',
        lnb: props.namekey as any,
      }}
      loading={boardLoading}
      active={board?.namekey}
    >
      <Page
        title={board?.name}
        action={[
          <Button
            key="edit"
            type="primary"
            onClick={() => {
              router.push(`/article/${board?.namekey}/edit`);
            }}
          >
            게시글 등록
          </Button>,
        ]}
      >
        <div className="pg-article">
          <Flex vertical gap={20}>
            <div className="article-filter">
              <Filter
                form={filterForm}
                keys={['status']}
                search={[
                  {
                    label: '제목',
                    value: 'subject',
                  },
                  {
                    label: '내용',
                    value: 'content',
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
                            <Select.Option value="notice">공지</Select.Option>
                            <Select.Option value="secret">비공개</Select.Option>
                          </Select>
                        )}
                      />
                    ),
                  },
                ]}
                tabs={[
                  {
                    label: '그룹',
                    enable: board?.group && board.group.length !== 0,
                    render: (onChange) => {
                      const options =
                        board?.group.map((item) => ({
                          label: item.name,
                          value: item.namekey,
                        })) || [];

                      return (
                        <Segmented
                          value={props.search.group}
                          onChange={(value) => onChange('group', value)}
                          options={[
                            {
                              label: '전체',
                              value: '',
                            },
                            ...options,
                          ]}
                        />
                      );
                    },
                  },
                ]}
              />
            </div>
            <div className="article-source">
              <TableSource<ArticleDto>
                meta={article?.meta}
                dataSource={article?.items}
                sort={[
                  {
                    key: 'createdAt',
                    label: '등록일시',
                  },
                ]}
                tableAlertRender={(ids, resetSelectedRowKeys) => (
                  <>
                    <Popconfirm
                      title={<></>}
                      placement="bottomRight"
                      description={
                        <>
                          삭제된 데이터는 복구가 불가능합니다.
                          <br />
                          정말 삭제하시겠습니까?
                        </>
                      }
                      onConfirm={async () => {
                        await articleService.adminRemoveArticle({ ids });
                        const adminSearchArticleQueryKey =
                          articleService.getAdminSearchArticleQueryKey();
                        await queryClient.invalidateQueries(
                          adminSearchArticleQueryKey,
                        );

                        toastr.remove();
                        resetSelectedRowKeys();
                      }}
                      okText="확인"
                      cancelText="취소"
                    >
                      <div className="action-item text">일괄 삭제</div>
                    </Popconfirm>
                  </>
                )}
                columns={[
                  {
                    title: '번호',
                    width: 80,
                    align: 'center',
                    sorter: false,
                    render: (dom, record, index) => {
                      return record.notice ? (
                        <Tag color="default" style={{ margin: 0 }}>
                          공지
                        </Tag>
                      ) : (
                        NumberUtils.pageNumbering(index, article?.meta)
                      );
                    },
                  },
                  {
                    title: '그룹',
                    hidden: board?.group.length === 0,
                    width: 120,
                    render: (dom, record) => {
                      return record.group?.name;
                    },
                  },
                  {
                    title: '제목',
                    render: (dom, record) => (
                      <Link
                        className="source-subject"
                        route={`/article/${board?.namekey}/${record.id}`}
                      >
                        {record.thumbnail && (
                          <div className="subject-thumbnail">
                            <img src={record.thumbnail} alt="" />
                          </div>
                        )}

                        <div className="subject-text">
                          {record.subject}
                          <div className="subject-icon">
                            {record.notice && (
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 1024 1024"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 0 0-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 0 0-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 0 1-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                              </svg>
                            )}
                            {record.secret && (
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M12 2C9.243 2 7 4.243 7 7v2H6c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v2H9V7zm9.002 13H13v-2.278c.595-.347 1-.985 1-1.722 0-1.103-.897-2-2-2s-2 .897-2 2c0 .736.405 1.375 1 1.722V20H6v-9h12l.002 9z"></path>
                              </svg>
                            )}
                            {record.upload?.length !== 0 && (
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 015 0v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5a2.5 2.5 0 005 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"></path>
                              </svg>
                            )}
                          </div>
                        </div>
                      </Link>
                    ),
                  },
                  {
                    title: '조회수',
                    dataIndex: 'hit',
                    hidden: true,
                    width: 80,
                    align: 'center',
                  },
                  {
                    title: '작성자',
                    width: 140,
                    render: (dom, record) => (
                      <>
                        {record.admin && <>{record.admin.name}</>}
                        {!record.admin && <>{record.author}</>}
                      </>
                    ),
                  },
                  {
                    title: '등록일시',
                    width: 140,
                    render: (dom, record) => {
                      return dayjs(record.createdAt).format('YYYY-MM-DD HH:mm');
                    },
                  },
                  {
                    title: '관리',
                    width: 80,
                    align: 'center',
                    sorter: false,
                    render: (dom, record) => {
                      return (
                        <Flex align="center" justify="center" gap={8}>
                          <Svg
                            color="primary"
                            cursor="pointer"
                            onClick={() =>
                              router.push({
                                pathname: `/article/${board?.namekey}/edit/${record.id}`,
                              })
                            }
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 1024 1024"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M964.256 49.664C929.392 16.256 890.933-.672 849.877-.672c-64.192 0-111.024 41.472-123.841 54.176-18.032 17.856-633.152 633.2-633.152 633.2a33.011 33.011 0 0 0-8.447 14.592C70.565 752.559 1.077 980.016.387 982.304c-3.567 11.648-.384 24.337 8.208 32.928a32.336 32.336 0 0 0 22.831 9.44c3.312 0 6.655-.496 9.919-1.569 2.352-.767 237.136-76.655 275.775-88.19a32.736 32.736 0 0 0 13.536-8.033c24.416-24.128 598.128-591.456 636.208-630.784 39.392-40.592 58.96-82.864 58.208-125.616-.784-42.208-21.248-82.848-60.816-120.816zM715.845 155.84c16.304 3.952 54.753 16.862 94.017 56.479 39.68 40.032 50.416 85.792 52.416 96.208-125.824 125.168-415.456 411.728-529.632 524.672-10.544-24.56-27.584-54.144-54.993-81.76-33.471-33.728-67.536-52.783-93.808-63.503 112.992-113.008 408.08-408.224 532-532.096zM140.39 741.95c17.584 4.672 54.111 18.224 91.344 55.76 28.672 28.912 42.208 60.8 48.288 80.24-44.48 14.304-141.872 47.92-203.76 67.872 18.336-60.336 49.311-154.304 64.128-203.872zm780.031-491.584a1748.764 1748.764 0 0 1-6.065 6.16c-10.113-26.049-27.857-59.52-58.577-90.496-31.391-31.648-63.231-50.32-88.75-61.36 2.175-2.16 3.855-3.857 4.511-4.496 3.664-3.617 36.897-35.376 78.32-35.376 23.84 0 47.248 10.88 69.617 32.32 26.511 25.424 40.175 50.512 40.624 74.592.431 24.576-12.913 51.04-39.68 78.656z"></path>
                            </svg>
                          </Svg>
                          <Popconfirm
                            title={<></>}
                            placement="bottomRight"
                            align={{
                              offset: [12, 12],
                            }}
                            description={
                              <>
                                삭제된 데이터는 복구가 불가능합니다.
                                <br />
                                정말 삭제하시겠습니까?
                              </>
                            }
                            onConfirm={async () => {
                              await articleService.adminDeleteArticle(
                                record.id,
                              );
                              const adminFindOneArticleQueryKey =
                                articleService.getAdminFindOneArticleQueryKey(
                                  record.id,
                                );
                              const adminSearchArticleQueryKey =
                                articleService.getAdminSearchArticleQueryKey();

                              await queryClient.invalidateQueries(
                                adminFindOneArticleQueryKey,
                              );
                              await queryClient.invalidateQueries(
                                adminSearchArticleQueryKey,
                              );

                              toastr.remove();
                            }}
                            okText="확인"
                            cancelText="취소"
                          >
                            <Svg color="error" cursor="pointer">
                              <svg
                                viewBox="64 64 896 896"
                                focusable="false"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                              >
                                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                              </svg>
                            </Svg>
                          </Popconfirm>
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

export default Article;

import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query';
import { Button, Divider, Popconfirm, Tooltip } from 'antd';
import dayjs from 'dayjs';
import lodash from 'lodash';

import { AdminLayout } from 'src/components/layout/admin-layout/admin-layout';
import { AdminGuard } from 'src/components/provider/session-provider/session-guard';
import Html from 'src/components/ui/html/html';

import parser from 'src/library/parser';
import reader from 'src/library/reader';
import toastr from 'src/library/toastr';

import * as articleService from 'src/service/article';

import './article-detail.css';

interface ArticleDetailProps {
  id: number;
  namekey: string;
}

export const getServerSideProps: GetServerSideProps<
  ArticleDetailProps
> = async (context) => {
  const queryClient = new QueryClient();

  const params = parser.paramUrl(context.params);
  const queryString = lodash.omitBy(
    context.query,
    (value, key) => params[key] === value,
  );

  return {
    props: { dehydratedState: dehydrate(queryClient), ...params },
  };
};

ArticleDetail.getProvider = (page: ReactElement) => {
  return <AdminGuard>{page}</AdminGuard>;
};

function ArticleDetail(props: ArticleDetailProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: board, isLoading: boardLoading } =
    articleService.useAdminFindOneBoardArticle(props.namekey);

  const { data: article } = articleService.useAdminFindOneArticle(props.id);

  return (
    <AdminLayout
      metadata={{
        gnb: 'contents',
        lnb: props.namekey as any,
      }}
      loading={boardLoading}
      active={board?.namekey}
    >
      {article && (
        <div className="pg-article-detail">
          <div className="detail-head">
            <div className="subject">{article.subject}</div>
            <div className="meta">
              <div className="data">
                <span>{article.board.name}</span>
                <Divider type="vertical" />
                {article.group && (
                  <>
                    <span>{article.group.name}</span>
                    <Divider type="vertical" />
                  </>
                )}
                <span>
                  {article.admin ? article.admin.name : article.author}{' '}
                  <small>
                    ({article.admin ? article.admin.username : article.username}
                    )
                  </small>
                </span>
                <Divider type="vertical" />
                <span>
                  등록일시{' '}
                  <Tooltip
                    title={
                      <div>
                        {dayjs(article.createdAt).format('YYYY-MM-DD HH:mm')}
                      </div>
                    }
                  >
                    <small>{dayjs(article.createdAt).fromNow()}</small>
                  </Tooltip>
                </span>
                <Divider type="vertical" />
                <span>
                  조회수 <small>{article.hit}</small>
                </span>

                {(article.notice ||
                  article.secret ||
                  article.upload?.length !== 0) && (
                  <>
                    <Divider type="vertical" />
                    <span>
                      <span className="icon">
                        {article.notice && (
                          <Tooltip title="공지글">
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
                          </Tooltip>
                        )}
                        {article.secret && (
                          <Tooltip title="비밀글">
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
                          </Tooltip>
                        )}
                        {article.upload?.length !== 0 && (
                          <Tooltip title="파일첨부">
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
                          </Tooltip>
                        )}
                      </span>
                    </span>
                  </>
                )}
              </div>
              <div className="action">
                {/*
                  <div
                    className="action-item"
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        `${process.env.NEXT_PUBLIC_URL_CLIENT}/article/${board?.namekey}/${article.id}`,
                      );
                      toastr.success({
                        content: '링크 주소가 복사되었습니다.',
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="currentColor"
                        d="M165.66 90.34a8 8 0 0 1 0 11.32l-64 64a8 8 0 0 1-11.32-11.32l64-64a8 8 0 0 1 11.32 0M215.6 40.4a56 56 0 0 0-79.2 0l-30.06 30.05a8 8 0 0 0 11.32 11.32l30.06-30a40 40 0 0 1 56.57 56.56l-30.07 30.06a8 8 0 0 0 11.31 11.32l30.07-30.11a56 56 0 0 0 0-79.2m-77.26 133.82l-30.06 30.06a40 40 0 1 1-56.56-56.57l30.05-30.05a8 8 0 0 0-11.32-11.32L40.4 136.4a56 56 0 0 0 79.2 79.2l30.06-30.07a8 8 0 0 0-11.32-11.31"
                      />
                    </svg>
                    링크 복사
                  </div>

                <a
                  className="action-item"
                  href={`${process.env.NEXT_PUBLIC_URL_CLIENT}/article/${board?.namekey}/${article.id}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {

                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm11-3v8h-2V6.413l-7.793 7.794l-1.414-1.414L17.585 5H13V3z"
                    />
                  </svg>
                  게시글 확인
                </a>
                */}
              </div>
            </div>
          </div>

          <div className="detail-content">
            <Html value={article.content} />
          </div>

          {article.upload?.length !== 0 && (
            <div className="detail-upload">
              <div className="title">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="22" y1="12" x2="2" y2="12"></line>
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                  <line x1="6" y1="16" x2="6.01" y2="16"></line>
                  <line x1="10" y1="16" x2="10.01" y2="16"></line>
                </svg>
                첨부된 파일이 {article.upload?.length}개 있습니다.
              </div>
              <div className="upload-list">
                {article.upload?.map((item) => (
                  <div
                    className="upload-item"
                    key={item.id}
                    onClick={async () => {
                      await reader.download(
                        `/admin/article/download/${item.id}`,
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="64 64 896 896"
                      focusable="false"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 00174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9z"></path>
                    </svg>
                    <div className="name">
                      {item.originalname}.{item.extension}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="detail-action">
            <Popconfirm
              title={<></>}
              placement="bottom"
              description={
                <>
                  삭제된 데이터는 복구가 불가능합니다.
                  <br />
                  정말 삭제하시겠습니까?
                </>
              }
              onConfirm={async () => {
                await articleService.adminDeleteArticle(article.id);
                const adminFindOneArticleQueryKey =
                  articleService.getAdminFindOneArticleQueryKey(article.id);
                const adminSearchArticleQueryKey =
                  articleService.getAdminSearchArticleQueryKey();

                await queryClient.invalidateQueries(adminSearchArticleQueryKey);

                await router.push(`/article/${board?.namekey}`);
                await queryClient.invalidateQueries(
                  adminFindOneArticleQueryKey,
                );
                toastr.remove();
              }}
              okText="확인"
              cancelText="취소"
            >
              <Button
                color="danger"
                type="default"
                icon={
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                  >
                    <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                  </svg>
                }
              >
                삭제
              </Button>
            </Popconfirm>
            <Button
              type="primary"
              icon={
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
              }
              onClick={() =>
                router.push(`/article/${board?.namekey}/edit/${article.id}`)
              }
            >
              수정
            </Button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default ArticleDetail;

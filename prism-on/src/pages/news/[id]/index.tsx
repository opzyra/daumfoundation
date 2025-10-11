import { ReactElement, useEffect } from 'react';

import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { QueryClient, dehydrate } from '@tanstack/react-query';
import dayjs from 'dayjs';
import lodash from 'lodash';

import { AppLayout } from 'src/components/layout/app-layout/app-layout';
import Container from 'src/components/shared/container/container';
import Html from 'src/components/ui/html/html';

import parser from 'src/library/parser';
import reader from 'src/library/reader';

import * as articleService from 'src/service/article';

import './news-detail.css';

interface NewsDetailProps {
  id: number;
}

export const getServerSideProps: GetServerSideProps<NewsDetailProps> = async (
  context,
) => {
  const queryClient = new QueryClient();

  const params = parser.paramUrl(context.params);
  const queryString = lodash.omitBy(
    context.query,
    (value, key) => params[key] === value,
  );

  const clientFindOneArticleQueryKey =
    articleService.getClientFindOneArticleQueryKey(params.id);

  await queryClient.prefetchQuery(clientFindOneArticleQueryKey, () =>
    articleService.clientFindOneArticle(params.id),
  );

  const clientSurroundArticleQueryKey =
    articleService.getClientSurroundArticleQueryKey(params.id);

  await queryClient.prefetchQuery(clientSurroundArticleQueryKey, () =>
    articleService.clientSurroundArticle(params.id),
  );

  return {
    props: { dehydratedState: dehydrate(queryClient), ...params },
  };
};

NewsDetail.getProvider = (page: ReactElement) => {
  return <>{page}</>;
};

function NewsDetail(props: NewsDetailProps) {
  const { data: article } = articleService.useClientFindOneArticle(props.id);
  const { data: surround } = articleService.useClientSurroundArticle(props.id);

  useEffect(() => {
    articleService.clientHitArticle({ id: props.id });
  }, []);

  if (!article) return;

  return (
    <AppLayout metadata={{ gnb: 'news' }}>
      <div className="pg-news-detail">
        <Container>
          <div className="detail-head">
            <div className="head-label">PRISM:ON AIR</div>
            <div className="head-subject">{article.subject}</div>
            <div className="head-date">
              {dayjs(article.createdAt).format('YYYY.MM.DD')}
            </div>
          </div>
          <div className="detail-contents">
            <div className="contents-inner">
              <Html value={article.content} />
            </div>
          </div>
          {article.upload?.length !== 0 && (
            <div className="detail-upload">
              <div className="upload-label">첨부파일</div>
              <div className="upload-list">
                {article.upload?.map((item) => (
                  <a
                    className="upload-item"
                    key={item.id}
                    onClick={async () => {
                      reader.download(`/client/article/download/${item.id}`);
                    }}
                  >
                    {item.fullname}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="detail-nav">
            <div className="nav-item">
              <div className="nav-label">
                <div className="label-text">이전글</div>
                <div className="label-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 10">
                    <path
                      d="M923.4,999.647l7.383,7.383,7.383-7.383"
                      transform="translate(939.58 1008.444) rotate(180)"
                      fill="none"
                      stroke="#1c1c1c"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                  </svg>
                </div>
              </div>
              {!surround?.prev && (
                <div className="nav-link empty">이전글이 없습니다.</div>
              )}
              {surround?.prev && (
                <Link className="nav-link" href={`/news/${surround.prev.id}`}>
                  {surround.prev.subject}
                </Link>
              )}
            </div>
            <div className="nav-item">
              <div className="nav-label">
                <div className="label-text">다음글</div>
                <div className="label-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 10">
                    <path
                      d="M923.4,999.647l7.383,7.383,7.383-7.383"
                      transform="translate(-921.986 -998.233)"
                      fill="none"
                      stroke="#1c1c1c"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                  </svg>
                </div>
              </div>
              {!surround?.next && (
                <div className="nav-link empty">다음글이 없습니다.</div>
              )}
              {surround?.next && (
                <Link className="nav-link" href={`/news/${surround.next.id}`}>
                  {surround.next.subject}
                </Link>
              )}
            </div>
          </div>
          <div className="detail-action">
            <Link href="/news">
              <button className="action-button">목록으로 이동</button>
            </Link>
          </div>
        </Container>
      </div>
    </AppLayout>
  );
}

export default NewsDetail;

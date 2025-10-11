import { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { QueryClient, dehydrate } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { AppLayout } from 'src/components/layout/app-layout/app-layout';
import Container from 'src/components/shared/container/container';

import * as articleService from 'src/service/article';

import './news.css';

interface NewsProps {
  clientFlattenArticleParams: any;
}

export const getServerSideProps: GetServerSideProps<NewsProps> = async () => {
  const queryClient = new QueryClient();

  const clientFlattenArticleParams = { board: 'prismon-news' };

  let clientFlattenArticleQueryKey =
    articleService.getClientFlattenArticleQueryKey(clientFlattenArticleParams);

  await queryClient.prefetchQuery(clientFlattenArticleQueryKey, () =>
    articleService.clientFlattenArticle(clientFlattenArticleParams),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      clientFlattenArticleParams,
    },
  };
};

News.getProvider = (page: ReactElement) => {
  return <>{page}</>;
};

function News(props: NewsProps) {
  const { data: news } = articleService.useClientFlattenArticle(
    props.clientFlattenArticleParams,
  );

  return (
    <AppLayout metadata={{ gnb: 'news' }}>
      <div className="pg-news">
        <Container>
          <div className="news-head">
            <div className="head-title">PRISM:ON AIR</div>
            <div className="head-description">
              예강프리즘온의 다채로운 소식을 만나보세요.
            </div>
          </div>
          <div className="news-contents">
            {news?.length === 0 && (
              <div className="news-empty">
                <div className="empty-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="#1d1d1d"
                      fill-rule="evenodd"
                      d="m25.21 24.21l-12.471 3.718a.525.525 0 0 1-.667-.606l4.456-21.511a.43.43 0 0 1 .809-.094l8.249 17.661a.6.6 0 0 1-.376.832m2.139-.878L17.8 2.883A1.53 1.53 0 0 0 16.491 2a1.51 1.51 0 0 0-1.4.729L4.736 19.648a1.59 1.59 0 0 0 .018 1.7l5.064 7.909a1.63 1.63 0 0 0 1.83.678l14.7-4.383a1.6 1.6 0 0 0 1-2.218Z"
                    />
                  </svg>
                </div>
                <div className="empty-text">등록된 소식이 없습니다.</div>
              </div>
            )}
            {news?.length !== 0 && (
              <div className="news-list">
                {news?.map((item) => (
                  <Link
                    className="news-item"
                    href={`/news/${item.id}`}
                    key={item.id}
                  >
                    <div className="thumbnail">
                      <img src={item.thumbnail} alt={item.subject} />
                    </div>
                    <div className="content">
                      <div className="content-title">{item.subject}</div>
                      <div className="content-date">
                        {dayjs(item.createdAt).format('YYYY.MM.DD')}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </AppLayout>
  );
}

export default News;

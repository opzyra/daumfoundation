import { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { AppLayout } from 'src/components/layout/app-layout/app-layout';
import Container from 'src/components/shared/container/container';

import './news.css';

interface NewsProps {}

export const getServerSideProps: GetServerSideProps<NewsProps> = async () => {
  const queryClient = new QueryClient();

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

News.getProvider = (page: ReactElement) => {
  return <>{page}</>;
};

function News(props: NewsProps) {
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
            <div className="news-list">
              <Link className="news-item" href="/news/1">
                <div className="thumbnail">
                  <img src="/images/news-sample.png" alt="샘플 이미지" />
                </div>
                <div className="content">
                  <div className="content-title">
                    아주 길게 만들어서 제목을 길게 입력하여 2줄로 만들면 이렇게
                    처리됩니다.
                  </div>
                  <div className="content-date">2025.10.03</div>
                </div>
              </Link>
              <div className="news-item">
                <div className="thumbnail">
                  <img src="/images/news-sample.png" alt="샘플 이미지" />
                </div>
                <div className="content">
                  <div className="content-title">
                    아주 길게 만들어서 제목을 길게 입력하여 2줄로 만들면 이렇게
                    처리됩니다.
                  </div>
                  <div className="content-date">2025.10.03</div>
                </div>
              </div>
              <div className="news-item">
                <div className="thumbnail">
                  <img src="/images/news-sample.png" alt="샘플 이미지" />
                </div>
                <div className="content">
                  <div className="content-title">
                    아주 길게 만들어서 제목을 길게 입력하여 2줄로 만들면 이렇게
                    처리됩니다.
                  </div>
                  <div className="content-date">2025.10.03</div>
                </div>
              </div>
              <div className="news-item">
                <div className="thumbnail">
                  <img src="/images/news-sample.png" alt="샘플 이미지" />
                </div>
                <div className="content">
                  <div className="content-title">
                    아주 길게 만들어서 제목을 길게 입력하여 2줄로 만들면 이렇게
                    처리됩니다.
                  </div>
                  <div className="content-date">2025.10.03</div>
                </div>
              </div>
              <div className="news-item">
                <div className="thumbnail">
                  <img src="/images/news-sample.png" alt="샘플 이미지" />
                </div>
                <div className="content">
                  <div className="content-title">
                    아주 길게 만들어서 제목을 길게 입력하여 2줄로 만들면 이렇게
                    처리됩니다.
                  </div>
                  <div className="content-date">2025.10.03</div>
                </div>
              </div>
              <div className="news-item">
                <div className="thumbnail">
                  <img src="/images/news-sample.png" alt="샘플 이미지" />
                </div>
                <div className="content">
                  <div className="content-title">
                    아주 길게 만들어서 제목을 길게 입력하여 2줄로 만들면 이렇게
                    처리됩니다.
                  </div>
                  <div className="content-date">2025.10.03</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </AppLayout>
  );
}

export default News;

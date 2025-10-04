import { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { AppLayout } from 'src/components/layout/app-layout/app-layout';
import Container from 'src/components/shared/container/container';

import './news-detail.css';

interface NewsDetailProps {}

export const getServerSideProps: GetServerSideProps<
  NewsDetailProps
> = async () => {
  const queryClient = new QueryClient();

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

NewsDetail.getProvider = (page: ReactElement) => {
  return <>{page}</>;
};

function NewsDetail(props: NewsDetailProps) {
  return (
    <AppLayout metadata={{ gnb: 'news' }}>
      <div className="pg-news-detail">
        <Container>
          <div className="detail-head">
            <div className="head-label">PRISM:ON AIR</div>
            <div className="head-subject">
              &lt;2025 예강프리즘온: 경계선 지능 아동 및 양육자 지원&gt; 협약식
              및 오리엔테이션을 진행했습니다!
            </div>
            <div className="head-date">2025.10.02</div>
          </div>
          <div className="detail-contents">
            <div className="contents-inner">
              <img src="/images/news-detail_sample.png" alt="" />
              <p>
                9월의 마지막 날, 다음세대재단과 예강희망키움재단이 새롭게 런칭한
                협력사업
                <br />
                &lt;2025 예강프리즘온: 경계선 지능 아동 및 양육자 지원&gt;
                협약식 및 오리엔테이션을 진행했습니다! 🤝🏻
              </p>

              <p>
                ‘예강프리즘온’은 사회적 관심과 지원이 부족한 복지 사각지대를
                발굴 및 지원하는 사업으로,
                <br />
                올해는 특히 경계선 지능 아동과 해당 가정에 초점을 맞췄습니다. ✨
              </p>

              <p>
                이번 협약식에는 다음세대재단, 예강희망키움재단을 비롯해
                서울특별시경계선지능인평생교육지원센터,
                <br />
                동대문·신월·염리·월계·유린원강종합사회복지관, 예룸예술학교,
                함께하랑 사회적협동조합, 스프링미, 사단법인 위밋업
                <br />총 12개 협력기관이 함께해주셨어요!
              </p>

              <p>
                이어진 오리엔테이션에서는 앞으로 경계선 지능 아동 및 양육자를
                만날 실무자들이 모여,
                <br />
                김성아 서울특별시경계선지능인평생교육지원센터장님의 강의를
                들으며 대상에 대한 이해를 넓혔답니다.
              </p>

              <p>
                다양한 협력기관들이 모인 만큼, 그 시너지가 기대되는
                ‘예강프리즘온’ 사업의 첫걸음에 힘찬 응원 부탁드립니다!
                <br />
                ‘예강프리즘온’ 사업에 대한 자세한 내용은 추후 소개될 예정이니
                많은 관심 부탁드려요. 🤗
              </p>
            </div>
          </div>
          <div className="detail-nav">
            <div className="nav-item">
              <div className="nav-label">
                <div className="label-text">이전글</div>
                <div className="label-arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17.594"
                    height="10.211"
                    viewBox="0 0 17.594 10.211"
                  >
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
              <div className="nav-link">이전글이 없습니다.</div>
            </div>
            <div className="nav-item">
              <div className="nav-label">
                <div className="label-text">다음글</div>
                <div className="label-arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17.594"
                    height="10.211"
                    viewBox="0 0 17.594 10.211"
                  >
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
              <div className="nav-link">
                &lt;2025 예강프리즘온: 경계선 지능 아동 및 양육자 지원&gt;
                협약식 및 오리엔테이션을 진행했습니다!
              </div>
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

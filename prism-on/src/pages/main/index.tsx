import { ReactElement, useEffect } from 'react';

import { GetServerSideProps } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { AppLayout } from 'src/components/layout/app-layout/app-layout';
import Container from 'src/components/shared/container/container';

import './main.css';

interface MainProps {}

export const getServerSideProps: GetServerSideProps<MainProps> = async (
  context,
) => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

Main.getProvider = (page: ReactElement) => {
  return <>{page}</>;
};

function Main(props: MainProps) {
  useEffect(() => {
    window.innerHeight;
  }, []);

  return (
    <AppLayout
      metadata={{
        gnb: 'main',
      }}
    >
      <div className="pg-main">
        <div className="main-cover">
          <Container>
            <div className="cover-phrase">
              <div className="phrase-text">
                다양한 색으로 세상을 비추는 변화의 스펙트럼
              </div>
              <div className="phrase-logo">
                <img src="/images/brand.png" alt="예강프리즘온" />
              </div>
              <div className="phrase-description">
                한 줄기의 빛이 프리즘을 통과해 다양한 색으로 퍼지듯,
                <br />
                다층적 시선을 통해 사회 속 가려진 사각지대를 발견하고
                <br />
                그곳에 건강한 변화의 스펙트럼을 펼칩니다.
              </div>
            </div>
          </Container>
        </div>
        <div className="main-introduce">
          <Container>
            <div className="introduce-title">예강프리즘온은</div>
            <div className="introduce-description"></div>
            <div className="introduce-cta"></div>
          </Container>
        </div>
      </div>
    </AppLayout>
  );
}

export default Main;

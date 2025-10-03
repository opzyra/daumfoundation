import { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { AppLayout } from 'src/components/layout/app-layout/app-layout';
import Container from 'src/components/shared/container/container';

import './intro.css';

interface IntroProps {}

export const getServerSideProps: GetServerSideProps<IntroProps> = async () => {
  const queryClient = new QueryClient();

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

Intro.getProvider = (page: ReactElement) => {
  return <>{page}</>;
};

function Intro(props: IntroProps) {
  return (
    <AppLayout metadata={{ gnb: 'intro' }}>
      <div className="pg-intro">
        <div className="intro-logo">
          <div className="logo-container">
            <div className="logo-phrase">
              다양한 색으로 세상을 비추는 변화의 스펙트럼
            </div>
            <div className="logo-image">
              <img src="/images/brand.png" alt="예강프리즘온" />
            </div>
          </div>
        </div>
        <div className="intro-description">
          예강프리즘온은 사회적 관심과 지원이 부족한 복지 사각지대를 조명하고,
          <br />
          당사자 수요에 기반해 다양한 프로그램, 서비스 등을 입체적으로 제공하여
          <br />
          신체적・정서적・사회적 건강 증진을 위한 통합적 지원 체계를 구축하는
          <br />
          예강희망키움재단과 다음세대재단의 협력 사업입니다.
        </div>
        <div className="intro-host">
          <Container>
            <div className="host-list">
              <div className="host-item">
                <a
                  href="https://www.yegangfoundation.org/"
                  target="_blank"
                  className="host-logo"
                >
                  <img
                    src="/images/logo-yegangfoundation_2x.png"
                    alt="예강희망키움재단"
                  />
                </a>
                <div className="host-text">
                  다우키움그룹 창업주 김익래 전 회장이
                  <br />
                  사회 환원을 위해 설립한 사회공헌 재단입니다.
                  <br />
                  <br />
                  비 온 뒤 하늘의 쌍무지개를 의미하는 예강霓岡처럼
                  <br />
                  ‘나눔으로 희망을 키우고 따뜻하게 성장할 수 있는 사회’를
                  미션으로 삼고,
                  <br />
                  취약계층이 공정한 기회를 누리며 건강한 환경에서 성장할 수
                  있도록
                  <br />
                  지속 가능한 지원을 펼치고 있습니다.
                </div>
              </div>
              <div className="host-item">
                <a
                  href="https://www.daumfoundation.org/"
                  target="_blank"
                  className="host-logo"
                >
                  <img
                    src="/images/logo-daumfoundation_2x.png"
                    alt="다음세대재단"
                  />
                </a>
                <div className="host-text">
                  &#34;비영리 생태계의{' '}
                  <span className="blank">
                    <span>[</span>
                    <span>]</span>
                  </span>{' '}
                  다음을 만듭니다&#34; 라는 미션 아래
                  <br />
                  혁신적인 공익활동을 발굴하고 지원합니다.
                  <br />
                  <br />
                  2001년 설립 이후 건강한 비영리 생태계 조성을 위해
                  <br />
                  비영리단체와 비영리 활동가들을 지원하고
                  <br />
                  다양성의 가치를 확산하기 위한 사업을 이어가고 있습니다.
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className="intro-value">
          <div className="value-title">
            “다양한 색으로 세상을 비추는 변화의 스펙트럼”
          </div>
          <div className="value-text">
            한 줄기의 빛이 프리즘을 통과하면
            <br />
            무지개와 같은 다양한 색의 스펙트럼을 형성하듯,
            <br />
            <br />
            ‘예강프리즘온’이라는 이름은
            <br />
            드러나지 않는 우리 사회의 사각지대를
            <br />
            다채로운 시선으로 바라보고 조명하겠다는 의지를 담고 있습니다.
            <br />
            <br />
            신체적·정서적·사회적 차원을 아우르는 다층적인 지원 체계를 통해
            <br />
            건강한 변화의 스펙트럼을 만들어가는 것을 목표로 합니다.
            <br />
            <br />
            예강프리즘온은 변화하는 사회문제를 꾸준히 발굴하고
            <br />
            복지 사각지대를 지원하는 혁신적인 활동을 지속적으로 추진해 나갈
            예정입니다.
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Intro;

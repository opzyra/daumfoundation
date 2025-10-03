import { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { AppLayout } from 'src/components/layout/app-layout/app-layout';
import Container from 'src/components/shared/container/container';

import './biz.css';

interface BizProps {}

export const getServerSideProps: GetServerSideProps<BizProps> = async () => {
  const queryClient = new QueryClient();

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

Biz.getProvider = (page: ReactElement) => {
  return <>{page}</>;
};

function Biz(props: BizProps) {
  return (
    <AppLayout metadata={{ gnb: 'biz' }}>
      <div className="pg-biz">
        <div className="biz-contents">
          <Container>
            <div className="contents-label">2025 PRISM:ON</div>
            <div className="contents-title">
              <div className="title-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11.743"
                  height="63"
                  viewBox="0 0 15.689 84.177"
                >
                  <path
                    d="M0,0V84.177H15.689V78.148H7.506V6.029h8.183V0Z"
                    transform="translate(0 0)"
                    fill="#292929"
                  />
                </svg>
              </div>
              <div className="title-content">경계선 지능 아동 및 양육자</div>
              <div className="title-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11.743"
                  height="63"
                  viewBox="0 0 15.689 84.177"
                >
                  <path
                    d="M825.829,0V6.029h8.183V78.148h-8.183v6.029h15.689V0Z"
                    transform="translate(-825.829 0)"
                    fill="#292929"
                  />
                </svg>
              </div>
            </div>
            <div className="contents-description">
              2025 예강프리즘온은 ‘경계선 지능 아동’에 주목합니다.
              <br />
              경계선 지능 아동과 해당 가정을 대상으로
              <br />
              아동의 신체적 건강 및 사회적 기능 향상과 양육자의 정서적 건강을
              지원합니다.
            </div>
            <div className="contents-detail">
              <div className="detail-item">
                <div className="detail-title">풋살 클래스</div>
                <div className="detail-content">
                  경계선 지능 아동이 팀 스포츠 참여를 통해
                  <br />
                  사회적 소통 능력, 상황 적응 능력, 신체운동 능력을 종합적으로
                  향상시킬 수 있도록
                  <br />
                  전문적 스포츠 경험과 학습 기회를 제공합니다.
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-title">회복탄력성 코칭</div>
                <div className="detail-content">
                  경계선 지능 아동의 양육자에게 회복탄력성 기반 교육 및 코칭을
                  제공하여
                  <br />
                  심리적 안정과 자기 돌봄 역량을 강화하고,
                  <br />
                  지속 가능한 정서적 안전망을 구축합니다.
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className="biz-startup">
          <Container>
            <div className="startup-title">협력 비영리스타트업</div>
            <div className="startup-description">
              예강프리즘온은 새로운 방식으로 사회문제를 해결하는 다양한
              비영리스타트업과 함께합니다.
            </div>
            <div className="startup-list">
              <div className="startup-item">
                <a className="startup-logo">
                  <img src="/images/startup-wemeetup.png" alt="wemeetup 로고" />
                </a>
                <div className="startup-text">
                  은퇴 여성 선수 재교육 및 스포츠 지도자 양성을 통해
                  <br />
                  누구나 즐길 수 있는 스포츠 경험을 제공하는 비영리 사단법인으로
                  <br />
                  풋살 클래스 운영에 함께합니다.
                </div>
              </div>
              <div className="startup-item">
                <a className="startup-logo">
                  <img src="/images/startup-springme.png" alt="springme 로고" />
                </a>
                <div className="startup-text">
                  심리적 취약 상황에 있는 성인, 양육자 등을 대상으로
                  <br />
                  회복탄력성 기반의 코칭 프로그램을 제공하는 전문기관으로
                  <br />
                  회복탄력성 코칭 운영에 함께합니다.
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className="biz-partner">
          <Container>
            <div className="partner-title">파트너</div>
            <div className="partner-description">
              예강프리즘온은 현장의 다양한 파트너와 함께합니다.
            </div>
            <div className="partner-list">
              <div className="partner-flex">
                <a
                  href="https://sbifc.org/"
                  target="_blank"
                  className="partner-item"
                >
                  <img
                    src="/images/partner-sbifc.png"
                    alt="서울특별시경계선지능인평생교육지원센터"
                  />
                </a>
                <a
                  href="http://www.communitycenter.or.kr/"
                  target="_blank"
                  className="partner-item"
                >
                  <img
                    src="/images/partner-communitycenter.png"
                    alt="동대문종합사회복지관"
                  />
                </a>
                <a
                  href="http://www.sinwc.org/main/main.html"
                  target="_blank"
                  className="partner-item"
                >
                  <img
                    src="/images/partner-sinwc.png"
                    alt="신월종합사회복지관"
                  />
                </a>
                <a
                  href="https://www.ynswc.or.kr/main/main.html"
                  target="_blank"
                  className="partner-item"
                >
                  <img
                    src="/images/partner-ynswc.png"
                    alt="염리종합사회복지관"
                  />
                </a>
                <a
                  href="https://yeroom.cafe24.com/"
                  target="_blank"
                  className="partner-item"
                >
                  <img src="/images/partner-yeroom.png" alt="예룸예술학교" />
                </a>
                <a
                  href="http://www.wwc.or.kr/"
                  target="_blank"
                  className="partner-item"
                >
                  <img src="/images/partner-wwc.png" alt="월계종합사회복지관" />
                </a>
                <a
                  href="http://www.yurin.or.kr/yurin/"
                  target="_blank"
                  className="partner-item"
                >
                  <img
                    src="/images/partner-yurin.png"
                    alt="유린원광종합사회복지관"
                  />
                </a>
                <a
                  href="https://withharang.co.kr/"
                  target="_blank"
                  className="partner-item"
                >
                  <img src="/images/partner-withharang.png" alt="함께하랑" />
                </a>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </AppLayout>
  );
}

export default Biz;

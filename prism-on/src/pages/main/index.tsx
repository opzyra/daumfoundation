import { ReactElement, useState } from 'react';

import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { QueryClient, dehydrate } from '@tanstack/react-query';
import type { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { AppLayout } from 'src/components/layout/app-layout/app-layout';
import Container from 'src/components/shared/container/container';
import ButtonMore from 'src/components/ui/button-more/button-more';

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
  const [swiper, setSwiper] = useState<SwiperClass>();

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
            <div className="introduce-description">
              사회적 관심과 지원이 부족한 <strong>복지 사각지대를 조명</strong>
              하고,
              <br />
              당사자 수요에 기반해 다양한 프로그램, 서비스 등을 입체적으로
              제공하여
              <br />
              <strong>
                신체적・정서적・사회적 건강 증진을 위한 통합적 지원 체계를 구축
              </strong>
              하는
              <br />
              예강희망키움재단과 다음세대재단의 협력 사업입니다.
            </div>
            <div className="introduce-more">
              <ButtonMore />
            </div>
          </Container>
        </div>
        <div className="main-phrase">
          <Container>
            <div className="phrase-label">PRISM:ON</div>
            <div className="phrase-title">
              <div className="title-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15.689"
                  height="84.177"
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
                  width="15.689"
                  height="84.177"
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
            <div className="phrase-description">
              2025 예강프리즘온은 <strong>경계선 지능 아동과 해당 가정</strong>
              을 대상으로
              <br />
              아동의 신체적 건강 및 사회적 기능 향상과 양육자의 정서적 건강을
              지원합니다.
            </div>
            <div className="phrase-more">
              <ButtonMore />
            </div>
          </Container>
        </div>
        <div className="main-news">
          <Container>
            <div className="news-label">PRISM:ON AIR</div>
            <div className="news-title">
              예강프리즘온의 다채로운 소식을 만나보세요.
            </div>
            <div className="news-contents">
              <div className="news-nav">
                <div className="nav-prev nav-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29.07"
                    height="55.866"
                    viewBox="0 0 29.07 55.866"
                  >
                    <path
                      d="M4.5,4.5,29.948,29.948,4.5,56.124"
                      transform="translate(31.448 58.245) rotate(180)"
                      fill="none"
                      stroke="#b7b7b7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                    />
                  </svg>
                </div>
                <div className="nav-next nav-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29.07"
                    height="55.866"
                    viewBox="0 0 29.07 55.866"
                  >
                    <path
                      d="M4.5,4.5,29.948,29.948,4.5,56.124"
                      transform="translate(-2.379 -2.378)"
                      fill="none"
                      stroke="#b7b7b7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                    />
                  </svg>
                </div>
              </div>
              <Swiper
                className="news-list"
                modules={[]}
                slidesPerView={3}
                freeMode={false}
                speed={1000}
                autoplay={false}
                loop={true}
                onSwiper={(swiper) => {
                  setSwiper(swiper);
                }}
                spaceBetween={32}
                allowTouchMove={true}
                observer={true}
                observeParents={true}
                breakpoints={{}}
              >
                <SwiperSlide>
                  <Link className="news-item" href="/">
                    <div className="thumbnail">
                      <img src="/images/news-sample.png" alt="샘플 이미지" />
                    </div>
                    <div className="content">
                      <div className="content-title">
                        아주 길게 만들어서 제목을 길게 입력하여 2줄로 만들면
                        이렇게 처리됩니다.
                      </div>
                      <div className="content-date">2025.10.03</div>
                    </div>
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link className="news-item" href="/">
                    <div className="thumbnail">
                      <img src="/images/news-sample.png" alt="샘플 이미지" />
                    </div>
                    <div className="content">
                      <div className="content-title">
                        아주 길게 만들어서 제목을 길게 입력하여 2줄로 만들면
                        이렇게 처리됩니다.
                      </div>
                      <div className="content-date">2025.10.03</div>
                    </div>
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link className="news-item" href="/">
                    <div className="thumbnail">
                      <img src="/images/news-sample.png" alt="샘플 이미지" />
                    </div>
                    <div className="content">
                      <div className="content-title">
                        아주 길게 만들어서 제목을 길게 입력하여 2줄로 만들면
                        이렇게 처리됩니다.
                      </div>
                      <div className="content-date">2025.10.03</div>
                    </div>
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link className="news-item" href="/">
                    <div className="thumbnail">
                      <img src="/images/news-sample.png" alt="샘플 이미지" />
                    </div>
                    <div className="content">
                      <div className="content-title">
                        아주 길게 만들어서 제목을 길게 입력하여 2줄로 만들면
                        이렇게 처리됩니다.
                      </div>
                      <div className="content-date">2025.10.03</div>
                    </div>
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link className="news-item" href="/">
                    <div className="thumbnail">
                      <img src="/images/news-sample.png" alt="샘플 이미지" />
                    </div>
                    <div className="content">
                      <div className="content-title">
                        아주 길게 만들어서 제목을 길게 입력하여 2줄로 만들면
                        이렇게 처리됩니다.
                      </div>
                      <div className="content-date">2025.10.03</div>
                    </div>
                  </Link>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="news-more">
              <ButtonMore />
            </div>
          </Container>
        </div>
      </div>
    </AppLayout>
  );
}

export default Main;

import { useMemo } from 'react';
import { CookiesProvider } from 'react-cookie';

import { appWithTranslation, useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Toaster } from 'sonner';
import 'sonner/dist/styles.css';
import 'suneditor/dist/css/suneditor.min.css';
import 'swiper/css';
import 'swiper/css/effect-fade';

import { AppProvider } from 'src/components/provider/app-provider/app-provider';
import { FontProvider } from 'src/components/provider/font-provider/font-provider';
import { SessionProvider } from 'src/components/provider/session-provider/session-provider';

import theme from 'src/library/antd';
import query from 'src/library/query';

import 'src/styles/index.css';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale('ko');

function App({ Component, pageProps }: AppProps) {
  const getProvider = Component.getProvider ?? ((page: any) => page);
  const router = useRouter();

  const { i18n } = useTranslation();

  const metadata = useMemo(() => {
    if (i18n.language === 'en') {
    }

    return {
      title: '예강프리즘온',
      description:
        '사회적 관심과 지원이 부족한 복지 사각지대를 발굴하고, 당사자 수요에 기반한 다양한 프로그램과 서비스를 통해 신체·정서·사회적 건강 증진을 지원하는 예강희망키움재단과 다음세대재단의 협력 사업입니다.',
      keywords: '',
    };
  }, [i18n.language]);

  return (
    <QueryClientProvider client={query}>
      <Hydrate state={pageProps.dehydratedState}>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <AntdConfigProvider
            getPopupContainer={(triggerNode) =>
              triggerNode?.parentElement || document.body
            }
            locale={koKR}
            theme={theme}
            wave={{
              disabled: true,
            }}
          >
            <Head>
              <meta charSet="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover"
              />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta
                name="format-detection"
                content="telephone=no, address=no, email=no"
              />

              <title>{metadata.title}</title>
              <link rel="shortcut icon" href={`/favicon.ico`} />
            </Head>
            <NextSeo
              canonical={process.env.NEXT_PUBLIC_URL_DOMAIN + router.asPath}
              description={metadata.description}
              additionalMetaTags={[
                {
                  name: 'keywords',
                  content: metadata.keywords,
                },
              ]}
              openGraph={{
                title: metadata.title,
                url: process.env.NEXT_PUBLIC_URL_DOMAIN + router.asPath,
                images: [
                  {
                    url: process.env.NEXT_PUBLIC_URL_DOMAIN + `/opengraph.png`,
                  },
                ],
              }}
            />

            <SessionProvider>
              <FontProvider>
                <AppProvider>
                  {getProvider(<Component {...pageProps} />)}
                </AppProvider>
              </FontProvider>
              <Toaster />
            </SessionProvider>
          </AntdConfigProvider>
        </CookiesProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);

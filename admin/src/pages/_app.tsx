import { CookiesProvider } from 'react-cookie';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { ConfigProvider as AntdMobileConfigProvider } from 'antd-mobile';
import AntdMobileKoKR from 'antd-mobile/es/locales/ko-KR';
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

import { AdminProvider } from 'src/components/provider/admin-provider/admin-provider';
import { AnimationProvider } from 'src/components/provider/animation-provider/animation-provider';
import { SessionProvider } from 'src/components/provider/session-provider/session-provider';
import { Font } from 'src/components/ui/font/font';

import theme from 'src/library/antd';
import query from 'src/library/query';

import 'src/styles/index.css';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale('ko');

function App({ Component, pageProps }: AppProps) {
  const getProvider = Component.getProvider ?? ((page: any) => page);
  const router = useRouter();

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
            <AntdMobileConfigProvider locale={AntdMobileKoKR}>
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

                <title>관리자</title>
                <link rel="shortcut icon" href={`/favicon.ico`} />
              </Head>
              <AnimationProvider>
                <SessionProvider>
                  <AdminProvider>
                    {getProvider(<Component {...pageProps} />)}
                  </AdminProvider>
                </SessionProvider>
              </AnimationProvider>
              <Font />
              <Toaster />
            </AntdMobileConfigProvider>
          </AntdConfigProvider>
        </CookiesProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default App;

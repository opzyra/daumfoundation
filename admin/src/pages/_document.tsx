import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import Script from 'next/script';

import {
  StyleProvider,
  createCache,
  legacyLogicalPropertiesTransformer,
} from '@ant-design/cssinjs';

class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    const initialProps = await Document.getInitialProps(ctx);

    const antdCache = createCache();
    const renderPage = () =>
      originalRenderPage({
        enhanceApp: (AppComponent) => (props) => (
          <StyleProvider
            hashPriority="high"
            cache={antdCache}
            ssrInline={true}
            transformers={[legacyLogicalPropertiesTransformer]}
          >
            <AppComponent {...props} />
          </StyleProvider>
        ),
      });

    await renderPage();

    return initialProps;
  }

  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <Main />
          <NextScript />
          {process.env.NEXT_PUBLIC_KEY_GOOGLE_ANALYTICS && <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_KEY_GOOGLE_ANALYTICS}`}
              strategy="beforeInteractive"
            ></Script>
            <Script id="ga-script" strategy="beforeInteractive">
              {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${process.env.NEXT_PUBLIC_KEY_GOOGLE_ANALYTICS}', {page_path: window.location.pathname,});`}
            </Script>
          </>}
          {process.env.NEXT_PUBLIC_KEY_GOOGLE_ANALYTICS && <>
          <Script
            src="https://developers.kakao.com/sdk/js/kakao.min.js"
            strategy="beforeInteractive"
          ></Script>
          <Script id="kakao-script" strategy="afterInteractive">
            {`Kakao.init('${process.env.NEXT_PUBLIC_KEY_KAKAO}');`}
          </Script>
          </>}
        </body>
      </Html>
    );
  }
}

export default AppDocument;

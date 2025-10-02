declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';

    readonly NEXT_PUBLIC_APP_NAME: string;

    readonly NEXT_PUBLIC_URL_DOMAIN: string;
    readonly NEXT_PUBLIC_URL_AUTH: string;
    readonly NEXT_PUBLIC_URL_API: string;
    readonly NEXT_PUBLIC_URL_SHARE: string;

    readonly NEXT_PUBLIC_KEY_KAKAO: string;
    readonly NEXT_PUBLIC_KEY_GOOGLE_ANALYTICS: string;
  }
}

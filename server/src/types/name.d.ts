declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';

    readonly APP_NAME: string;
    readonly APP_PORT: string;

    readonly URL_DOMAIN: string;
    readonly URL_ADMIN: string;
    readonly URL_CLIENT: string;
    readonly URL_CDN: string;

    readonly DB_HOST: string;
    readonly DB_PORT: string;
    readonly DB_USERNAME: string;
    readonly DB_PASSWORD: string;
    readonly DB_NAME: string;

    readonly SESSION_NAME: string;
    readonly SESSION_SECRET: string;
    readonly SESSION_MAX_TIME: string;
    readonly SESSION_RECONNECT_ADMIN_TIME: string;
    readonly SESSION_RECONNECT_ADMIN_NAME: string;
    readonly SESSION_RECONNECT_CLIENT_TIME: string;
    readonly SESSION_RECONNECT_CLIENT_NAME: string;
    readonly SESSION_DOMAIN: string;

    readonly JWT_SECRET: string;
    readonly JWT_ACCESS_EXPIRES_IN: string;

    readonly RESOURCE_MAX_SIZE: string;
    readonly RESOURCE_EXTENSION: string;

    readonly UPLOAD_MAX_COUNT: string;
    readonly UPLOAD_MAX_SIZE: string;
    readonly UPLOAD_EXTENSION: string;

    readonly CRYPTO_KEY: string;
    readonly CRYPTO_IV: string;

    readonly ALIGO_URL: string;
    readonly ALIGO_KEY: string;
    readonly ALIGO_USER_ID: string;
    readonly ALIGO_SENDER: string;

    readonly AWS_REGION: string;
    readonly AWS_ACCESS_KEY: string;
    readonly AWS_SECRET_KEY: string;
  }
}

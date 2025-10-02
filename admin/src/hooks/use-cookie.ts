import { useCookies } from 'react-cookie';

import { CookieSetOptions } from 'universal-cookie';

const keyProps = {
  splash: '스플래시 화면',
} as const;

type keyProps = keyof typeof keyProps | string;

const getKey = (key: keyProps) => {
  return `${process.env.NEXT_PUBLIC_APP_NAME}.${key}`;
};

export function useCookie() {
  const [cookies, setCookies, removeCookie] = useCookies();

  const get = (key: keyProps) => {
    return cookies[getKey(key)];
  };

  const set = (key: keyProps, value: any, options?: CookieSetOptions) => {
    setCookies(getKey(key), value, options);
  };

  const remove = (key: keyProps, options?: CookieSetOptions) => {
    removeCookie(getKey(key), options);
  };

  return { get, set, remove };
}

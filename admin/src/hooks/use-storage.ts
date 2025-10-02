import { useCallback } from 'react';

const keys = {
  admin_layout_collapse: '메뉴 펼침',
  admin_layout_fold: '네비게이션 접힘',
} as const;

type Key = keyof typeof keys;

const getKey = (key: Key) => `${process.env.NEXT_PUBLIC_APP_NAME}.${key}`;

const isBrowser = () => typeof window !== 'undefined';

export function useStorage() {
  // JSON parse 안전 처리
  const safeParse = useCallback((raw: string | null) => {
    if (raw == null) return undefined;
    try {
      return JSON.parse(raw);
    } catch {
      // JSON이 아니면 문자열 그대로 반환
      return raw;
    }
  }, []);

  // JSON stringify 안전 처리
  const safeStringify = useCallback((val: unknown) => {
    try {
      return typeof val === 'string' ? val : JSON.stringify(val);
    } catch {
      return String(val);
    }
  }, []);

  const get = <T = unknown>(key: Key): T | undefined => {
    if (!isBrowser()) return undefined;
    const k = getKey(key);
    const raw = window.localStorage.getItem(k);
    return safeParse(raw) as T | undefined;
  };

  const set = (key: Key, value: unknown) => {
    if (!isBrowser()) return;
    const k = getKey(key);
    const raw = safeStringify(value);
    window.localStorage.setItem(k, raw);
  };

  const remove = (key: Key) => {
    if (!isBrowser()) return;
    window.localStorage.removeItem(getKey(key));
  };

  return {
    get,
    set,
    remove,
  };
}

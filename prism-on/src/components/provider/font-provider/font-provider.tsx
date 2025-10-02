import React from 'react';

import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: '../../../../public/fonts/Pretendard/Pretendard-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Pretendard/Pretendard-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Pretendard/Pretendard-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Pretendard/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Pretendard/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Pretendard/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Pretendard/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Pretendard/Pretendard-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Pretendard/Pretendard-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
});

/*
--paperlogy: ${paperlogy.style.fontFamily};
*/
export const paperlogy = localFont({
  src: [
    {
      path: '../../../../public/fonts/Paperlogy/Paperlogy-1Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Paperlogy/Paperlogy-2ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Paperlogy/Paperlogy-3Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Paperlogy/Paperlogy-4Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Paperlogy/Paperlogy-5Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Paperlogy/Paperlogy-6SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Paperlogy/Paperlogy-7Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Paperlogy/Paperlogy-8ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Paperlogy/Paperlogy-9Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
});

export const dongle = localFont({
  src: [
    {
      path: '../../../../public/fonts/Dongle/Dongle-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Dongle/Dongle-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Dongle/Dongle-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
});

export const fontFamily = pretendard.style.fontFamily;

interface FontProviderProps {
  children: React.ReactNode;
}

export function FontProvider({ children }: FontProviderProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --pretendard: ${pretendard.style.fontFamily};
          --paperlogy: ${paperlogy.style.fontFamily};
          --dongle: ${dongle.style.fontFamily};
        }
      `}</style>
      {children}
    </>
  );
}

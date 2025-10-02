import React from 'react';

import localFont from 'next/font/local';

export const Pretendard = localFont({
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
});

/*
--nexon-gothic: ${NexonGothic.style.fontFamily};
*/
export const NexonGothic = localFont({
  variable: '--nexon-gothic',
  src: '../../../../public/fonts/NexonGothic/NEXONLv1GothicOTF.woff',
  display: 'swap',
  weight: '45 920',
  preload: true,
});

export const fontFamily = Pretendard.style.fontFamily;

export function Font() {
  return (
    <style jsx global>{`
      :root {
        --pretendard: ${Pretendard.style.fontFamily};
        --nexon-gothic: ${NexonGothic.style.fontFamily};
      }
    `}</style>
  );
}

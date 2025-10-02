import { createRoot } from 'react-dom/client';

import { ThemeConfig, unstableSetRender } from 'antd';

import { fontFamily } from 'src/components/provider/font-provider/font-provider';

unstableSetRender((node, container) => {
  // @ts-ignore
  container._reactRoot ||= createRoot(container);
  // @ts-ignore
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

const theme: ThemeConfig = {
  hashed: false,
  token: {
    borderRadius: 4,
    fontSize: 14,
    fontFamily: fontFamily,
    colorPrimary: '#121F83',
    colorLink: '#000000',
    colorBorder: '#e0e6eb',

    screenXS: 480,
    screenXSMin: 480,
    screenXSMax: 575,

    screenSM: 576,
    screenSMMin: 576,
    screenSMMax: 767,

    screenMD: 768,
    screenMDMin: 768,
    screenMDMax: 1023,

    screenLG: 1024,
    screenLGMin: 1024,
    screenLGMax: 1439,

    screenXL: 1440,
    screenXLMin: 1440,
    screenXLMax: 1919,

    screenXXL: 1920,
    screenXXLMin: 1920,
  },
};

export default theme;

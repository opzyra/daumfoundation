import * as stc from '@marko19907/string-to-color';

const generateColor = (value?: string) => {
  return stc.generateColor(value || '', {
    saturation: 80,
    lightness: 30,
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { generateColor };

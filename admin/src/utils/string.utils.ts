import { htmlToText } from 'html-to-text';

export default class StringUtils {
  static split(value?: string, length?: number) {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value;
    }

    const array = value.split(',');
    if (length) {
      return array.filter((item, index) => index < length);
    }

    return array;
  }

  static timeFormatter(second: number) {
    second = Math.floor(second);
    const pad = (number: number) => {
      return ('0' + number).slice(-2);
    };

    let minutes = Math.floor(second / 60);
    second = second % 60;
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(second)}`;
  }

  static inputNumber(value: string) {
    if (!value || value === '') return '';

    return value.replace(/[^0-9]/g, '');
  }

  static bizNumber(value: string) {
    return value
      .replace(/[^0-9]/g, '')
      .replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
  }

  static phoneNumber(value: string, code = false) {
    if (!value) {
      return '';
    }

    const number = value.replace(/[^0-9]/g, '');

    if (code) {
      return number
        .replace(/(^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2')
        .replace('--', '-');
    }

    return number

      .replace(
        /(^02|^0505|0507|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
        '$1-$2-$3',
      )
      .replace('--', '-');
  }

  static residence(value: string) {
    return value.replace(/(\d{6})(\d{7})/, '$1-$2');
  }

  static textToHtml(value: string) {
    if (!value) return '';

    return value.replace(/(\r\n|\r|\n)/g, '<br/>');
  }

  static htmlToText(value: string, limit?: number) {
    if (!value || value === '') return '';
    let text = htmlToText(value, {
      selectors: [
        { selector: 'a', options: { ignoreHref: true } },
        { selector: 'img', format: 'skip' },
      ],
    });

    text = text.replace(/(?:\r\n|\r|\n)/g, '');
    text = text.trim();

    if (limit) {
      let isOver = true;
      if (limit > text.length) {
        limit = text.length;
        isOver = false;
      }
      return text.substring(0, limit) + (isOver ? '...' : '');
    }

    return text;
  }
}

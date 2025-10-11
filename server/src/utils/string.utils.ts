import { Logger } from '@nestjs/common';

import axios from 'axios';
import dayjs from 'dayjs';
import sharp from 'sharp';

export class StringUtils {
  static async extractThumbnail(content?: string) {
    if (!content) return null;

    const image = content.match(/<img[^>]*src=[\\"']?([^>\\"']+)["']?[^>]*>/);
    const iframe = content.match(
      /<iframe[^>]*src=[\\"']?([^>\\"']+)["']?[^>]*>/,
    );

    if (iframe) {
      // @ts-ignore
      return iframe[0].match(/(?<=src=").*?(?=[\*"])/)[0];
    }

    if (image) {
      // @ts-ignore
      const path = image[0].match(/<img[^>]*src=["']?([^>"']+)["']?[^>]*>/i)[1];

      if (!path) {
        return null;
      }

      if (!path.startsWith(process.env.URL_CDN || '')) {
        try {
          const input = (
            await axios({ url: path, responseType: 'arraybuffer' })
          ).data;

          //const thumbnail = path.substring(path.lastIndexOf('/') + 1);
          const name = StringUtils.generateFilename();

          await sharp(input).png().toFile(`./resources/article/${name}.png`);

          return `#{CDN_URL}/resources/article/${name}.png`;
        } catch (e: any) {
          Logger.error(e, 'extract thumbnail error occurred');
        }
      }

      return path?.replace(process.env.URL_CDN + '/', '#{CDN_URL}/');
    }

    return null;
  }

  static generateAuthCode(length: number): string {
    return String(Math.floor(Math.random() * Math.pow(10, length))).padStart(
      length,
      '0',
    );
  }

  static generateFilename() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let filename = '';
    for (let i = 0; i < 20; i++) {
      filename += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return filename
      .concat(dayjs().format('YYYYMMDD'))
      .split('')
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join('');
  }

  static generateTemporal(length: number) {
    const chars = 'abcdefghijklmnopqrstuvwxyz23456789';
    let str = '';
    for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
  }

  static convertFilesize(filesize: string) {
    const size = filesize.replace(/\D/gi, '');
    const unit = filesize.replace(/\d/gi, '');
    let byte = 0;
    switch (unit.toLowerCase()) {
      case 'mb':
        byte = 1024 * 1024 * parseInt(size);
        break;
      case 'gb':
        byte = 1024 * 1024 * 1024 * parseInt(size);
        break;
    }

    return byte;
  }
}

import { BadRequestException, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { resourceStorage } from 'src/providers/multer/multer.storage';

const convertFileSize = (size: string): number => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const regex = /^(\d+(?:\.\d+)?)\s*(B|KB|MB|GB|TB)$/i;
  const match = size.match(regex);

  if (!match) {
    throw new Error('Invalid size format');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, value, unit] = match;
  const unitIndex = units.findIndex(
    (u) => u.toUpperCase() === unit.toUpperCase(),
  );
  if (unitIndex === -1) {
    throw new Error('Unknown size unit');
  }

  return parseFloat(value) * Math.pow(1024, unitIndex);
};

const filterAllowFileExtension = (
  whitelist: string[],
  extension: string,
): boolean => {
  for (let i = 0; i < whitelist.length; i++) {
    const regx = new RegExp(extension.toLowerCase());
    if (regx.exec(whitelist[i])) {
      return true;
    }
  }
  return false;
};

export const ResourceInterceptor = (context?: string) =>
  UseInterceptors(
    FileInterceptor('file', {
      storage: resourceStorage(context),
      limits: {
        files: 1,
        fileSize: convertFileSize(process.env.RESOURCE_MAX_SIZE),
      },
      fileFilter: (req, file: any, callback) => {
        const fileName = Buffer.from(file.originalname, 'latin1').toString(
          'utf8',
        );
        const extension = fileName
          .substring(fileName.lastIndexOf('.') + 1, fileName.length)
          .toLowerCase();
        const whitelist = process.env.RESOURCE_EXTENSION.split(',');
        const isAllow = filterAllowFileExtension(whitelist, extension);
        if (!isAllow) {
          return callback(
            new BadRequestException(
              `${extension} 파일은 업로드할 수 없습니다.`,
            ),
            false,
          );
        }

        file.originalname = fileName.normalize('NFC');
        file.extension = extension;
        file.relativePath = '#{CDN_URL}/' + file.path;
        return callback(null, true);
      },
    }),
  );

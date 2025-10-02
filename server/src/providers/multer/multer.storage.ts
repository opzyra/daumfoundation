import fs from 'fs';
import multer from 'multer';

import { StringUtils } from 'src/utils/string.utils';

function mkdir(path: string) {
  const isExists = fs.existsSync(path);
  if (!isExists) {
    fs.mkdirSync(path, { recursive: true });
  }
}

export const resourceStorage = (context?: string) => {
  return multer?.diskStorage({
    destination(req, file, cb) {
      let destination = `./resources`;

      if (context) {
        destination += `/${context}`;
      }

      mkdir(destination);
      cb(null, destination);
    },
    filename(req, file, cb) {
      const fileName = Buffer.from(file.originalname, 'latin1').toString(
        'utf8',
      );

      const extension = fileName.substring(
        fileName.lastIndexOf('.') + 1,
        fileName.length,
      );
      cb(null, StringUtils.generateFilename() + '.' + extension);
    },
  });
};

export const uploadStorage = (context?: string) => {
  return multer?.diskStorage({
    destination(req, file, cb) {
      let destination = `./uploads`;

      if (context) {
        destination += `/${context}`;
      }

      mkdir(destination);
      cb(null, destination);
    },
    filename(req, file, cb) {
      const fileName = Buffer.from(file.originalname, 'latin1').toString(
        'utf8',
      );
      const extension = fileName.substring(
        fileName.lastIndexOf('.') + 1,
        fileName.length,
      );
      cb(null, StringUtils.generateFilename() + '.' + extension);
    },
  });
};

import { NextFunction, Request, Response } from 'express';
import { UAParser } from 'ua-parser-js';

const middleware = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.headers['user-agent'];
  const parser = new UAParser(userAgent);
  const os = parser.getOS().name;

  let device: any = 'other';

  if (os === 'iOS') {
    device = 'iPhone';
  }

  if (os === 'android') {
    device = 'android';
  }

  if (os === 'Windows') {
    device = 'windows';
  }

  if (os === 'macOS') {
    device = 'mac';
  }

  req.useragent.device = device;
  req.useragent.ip = req.clientIp;

  next();
};

export default {
  middleware,
};

import { AdminDto } from 'src/modules/admin/dto/admin.dto';

export {};

declare global {
  interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    stream: Readable;
    destination: string;
    filename: string;
    path: string;
    relativePath: string;
    key: string;
    buffer: Buffer;
  }

  export type ModelAttributes<TAttributes = any> = {
    [AttributeName in keyof TAttributes['_creationAttributes'] as AttributeName extends string
      ? AttributeName
      : never]?: TAttributes['_creationAttributes'][AttributeName] | any;
  };
}

declare module 'express-session' {
  interface SessionData {
    admin: AdminDto;
    user: any;
  }
}

declare module 'express-useragent' {
  export interface Details {
    isMobile: boolean;
    isMobileNative: boolean;
    isTablet: boolean;
    isiPad: boolean;
    isiPod: boolean;
    isiPhone: boolean;
    isAndroid: boolean;
    isBlackberry: boolean;
    isOpera: boolean;
    isIE: boolean;
    isEdge: boolean;
    isIECompatibilityMode: boolean;
    isSafari: boolean;
    isFirefox: boolean;
    isWebkit: boolean;
    isChrome: boolean;
    isKonqueror: boolean;
    isOmniWeb: boolean;
    isSeaMonkey: boolean;
    isFlock: boolean;
    isAmaya: boolean;
    isEpiphany: boolean;
    isDesktop: boolean;
    isWindows: boolean;
    isWindowsPhone: boolean;
    isLinux: boolean;
    isLinux64: boolean;
    isMac: boolean;
    isChromeOS: boolean;
    isBada: boolean;
    isSamsung: boolean;
    isRaspberry: boolean;
    isBot: boolean;
    isCurl: boolean;
    isAndroidTablet: boolean;
    isWinJs: boolean;
    isKindleFire: boolean;
    isSilk: boolean;
    isCaptive: boolean;
    isSmartTV: boolean;
    silkAccelerated: boolean;
    browser: string;
    version: string;
    os: string;
    platform: string;
    geoIp: {
      [p: string]: any;
    };
    source: string;
    device: 'iPhone' | 'android' | 'windows' | 'other';
    ip: string;
  }
}

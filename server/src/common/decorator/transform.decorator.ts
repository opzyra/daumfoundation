import { applyDecorators } from '@nestjs/common';
import { Logger } from '@nestjs/common';

import { Expose, Transform } from 'class-transformer';
import { IsIn } from 'class-validator';

import { Crypto } from 'src/providers/crypto/crypto';
import logger from 'src/providers/winston/logger.winston';
import xss from 'src/providers/xss/xss';

export function DefaultValue(defaultValue) {
  return Transform(
    ({ value }) => {
      if (!value) {
        return defaultValue;
      }
      return value;
    },
    {
      toClassOnly: true,
    },
  );
}

export function NumberValue() {
  return Transform(
    ({ value }) => {
      if (value) {
        return parseInt(value);
      }
      return value;
    },
    {
      toClassOnly: true,
    },
  );
}

export function UrlValue() {
  return Transform(
    ({ value }) => {
      if (value) {
        return decodeURIComponent(value);
      }
      return value;
    },
    {
      toClassOnly: true,
    },
  );
}

export function IsInValue(values: any[]) {
  return applyDecorators(
    Transform(({ value }) => (value === '' ? undefined : value)),
    IsIn(values),
  );
}

export function ArrayValue() {
  return Transform(
    ({ value }) => {
      if (value && !Array.isArray(value)) {
        return value.split(',');
      }
      return value;
    },
    {
      toClassOnly: true,
    },
  );
}

export function ArrayNumberValue() {
  return Transform(
    ({ value }) => {
      if (value && !Array.isArray(value)) {
        return value.split(',').map(Number);
      }
      return value;
    },
    {
      toClassOnly: true,
    },
  );
}

export function ResourceValue() {
  return applyDecorators(
    Transform(
      ({ value }) => {
        if (!value) return value;

        // TODO XSS 처리가 필요한가?
        const filtered = value;

        return filtered.replace(process.env.URL_CDN, '#{CDN_URL}');
      },
      {
        toClassOnly: true,
      },
    ),
    Transform(
      ({ value }) => {
        if (!value) return value;

        return value.replace('#{CDN_URL}', process.env.URL_CDN);
      },
      {
        toPlainOnly: true,
      },
    ),
  );
}

// 본문 영역
export function ContentValue() {
  return applyDecorators(
    Transform(
      ({ value }) => {
        if (!value) return value;

        const filtered = xss.process(value);

        const regExp = new RegExp(`\src=\"${process.env.MULTER_CDN_URL}`, 'gi');
        return filtered.replace(regExp, `src="#{CDN_URL}`);
      },
      {
        toClassOnly: true,
      },
    ),
    Transform(
      ({ value }) => {
        if (!value) return value;

        const regExp = new RegExp(`\#{CDN_URL\}`, 'gi');
        return value.replace(regExp, process.env.MULTER_CDN_URL);
      },
      {
        toPlainOnly: true,
      },
    ),
  );
}

// 암호화
export function CryptoValue() {
  return applyDecorators(
    Transform(
      ({ value }) => {
        if (!value) return value;
        return Crypto.encrypt(value);
      },
      {
        toClassOnly: true,
      },
    ),
    Transform(
      ({ value }) => {
        if (!value) return value;
        return Crypto.decrypt(value);
      },
      {
        toPlainOnly: true,
      },
    ),
  );
}

export function JsonValue() {
  return applyDecorators(
    Transform(
      ({ value }) => {
        if (!value) return value;
        try {
          return JSON.stringify(value);
        } catch (e: unknown) {
          const error = e as Error;
          Logger.error(error.message, error.stack);
          logger.error(error.message, error.stack);

          return;
        }
      },
      {
        toClassOnly: true,
      },
    ),
    Transform(
      ({ value }) => {
        if (!value) return value;
        try {
          return JSON.parse(value);
        } catch (e: unknown) {
          const error = e as Error;
          Logger.error(error.message, error.stack);
          logger.error(error.message, error.stack);

          return;
        }
      },
      {
        toPlainOnly: true,
      },
    ),
  );
}

interface RelationKeyOptionProps {
  /** id 필드명 (기본 'id') */
  fieldName?: string;
  /** 숫자로 강제 캐스팅할지 (기본 false) */
  numeric?: boolean;
  /** 중복 제거할지 (기본 true) */
  unique?: boolean;
}

export function RelationKey(
  relationKey: string,
  opts: RelationKeyOptionProps = {},
): PropertyDecorator {
  const { fieldName = 'id', numeric = false, unique = true } = opts;

  return applyDecorators(
    Expose(),
    Transform(
      ({ obj }) => {
        const rel = obj?.[relationKey];
        if (!Array.isArray(rel)) return [];

        let ids = rel
          .map((item: any) => item?.[fieldName])
          .filter((v) => v !== undefined && v !== null);

        if (numeric) ids = ids.map((v: any) => Number(v));
        if (unique) ids = Array.from(new Set(ids));

        return ids;
      },
      { toPlainOnly: true },
    ),
  );
}

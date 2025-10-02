import lodash from 'lodash';
import qs from 'query-string';

function clean(obj: any): any {
  return lodash.cloneDeepWith(obj, (value) => {
    if (lodash.isPlainObject(value)) {
      return lodash.omitBy(value, (v) => v === '');
    }
    if (lodash.isArray(value)) {
      return value.filter((v) => v !== '');
    }
  });
}

const paramUrl = (params: any, defaultValue?: any) => {
  const raw = params
    ? Object.entries(params)
        .map(([k, v]) => `${k}=${v}`)
        .join('&')
    : '';

  const parsed = qs.parse(raw, { parseNumbers: true, parseBooleans: true });
  return lodash.defaults(clean(parsed), defaultValue);
};

const queryUrl = (url?: string, defaultValue?: any) => {
  if (!url) return defaultValue || {};

  const parsedUrl = url.split('?')[1] || '';

  const parsed = qs.parse(parsedUrl);

  const typedParsed = qs.parse(parsedUrl, {
    parseNumbers: true,
    parseBooleans: true,
  });

  return lodash.defaults(
    clean({ ...typedParsed, page: parsed.page, limit: parsed.limit }),
    defaultValue,
  );
};

const queryString = (object: any) => {
  return qs.stringify(object);
};

export default { paramUrl, queryUrl, queryString };

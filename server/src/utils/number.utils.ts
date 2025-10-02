import parseDuration from 'parse-duration';

export class NumberUtils {
  static parseDuration(value: string) {
    return parseDuration(value);
  }
}

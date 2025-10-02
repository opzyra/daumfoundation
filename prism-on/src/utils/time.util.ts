export default class TimeUtils {
  static delay(min: number, max?: number) {
    let time = min;
    if (max) {
      time = Math.floor(Math.random() * (max - min + 1) + min);
    }

    return new Promise((resolve) => setTimeout(resolve, time));
  }
}

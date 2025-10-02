import bcrypt from 'bcrypt';

export class Bcrypt {
  static async encrypt(raw: string) {
    return await bcrypt.hash(raw, 10);
  }

  static async compare(raw: string, encrypted: string) {
    return await bcrypt.compare(raw, encrypted);
  }
}

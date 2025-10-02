import crypto from 'crypto';

export class Crypto {
  static encrypt(value: string) {
    if (!value) return value;
    const iv = Buffer.from(process.env.CRYPTO_IV);
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(process.env.CRYPTO_KEY),
      iv,
    );
    const encrypted = cipher.update(value);
    return Buffer.concat([encrypted, cipher.final()]).toString('hex');
  }

  static decrypt(value: string) {
    if (!value) return value;
    const iv = Buffer.from(process.env.CRYPTO_IV);
    const encrypted = Buffer.from(value, 'hex');

    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(process.env.CRYPTO_KEY),
      iv,
    );
    const decrypted = decipher.update(encrypted);
    return Buffer.concat([decrypted, decipher.final()]).toString();
  }
}

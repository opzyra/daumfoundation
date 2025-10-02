export {};

declare global {
  interface StoreProps<T> extends T {
    set: (data: Partial<T>) => void;
  }
}

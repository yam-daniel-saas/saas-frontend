import { createMMKV } from 'react-native-mmkv';

const mmkvStorage = createMMKV({
  id: 'barbershop-storage',
  encryptionKey: 'barbershop-secure-key-2024',
});

export const storage = {
  /**
   * Loads a string from storage.
   *
   * @param key The key to fetch.
   */
  loadString(key: string): string | null {
    try {
      return mmkvStorage.getString(key) ?? null;
    } catch {
      // not sure why this would fail... even reading the RN docs I'm unclear
      return null;
    }
  },

  /**
   * Saves a string to storage.
   *
   * @param key The key to fetch.
   * @param value The value to store.
   */
  saveString(key: string, value: string): boolean {
    try {
      mmkvStorage.set(key, value);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Loads something from storage and runs it thru JSON.parse.
   *
   * @param key The key to fetch.
   */
  load<T>(key: string): T | null {
    let almostThere: string | null = null;
    try {
      almostThere = this.loadString(key);
      return JSON.parse(almostThere ?? '') as T;
    } catch {
      return (almostThere as T) ?? null;
    }
  },

  /**
   * Saves an object to storage.
   *
   * @param key The key to fetch.
   * @param value The value to store.
   */
  save(key: string, value: unknown): boolean {
    try {
      this.saveString(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Removes something from storage.
   *
   * @param key The key to kill.
   */
  remove(key: string): void {
    try {
      mmkvStorage.remove(key);
    } catch {}
  },

  /**
   * Burn it all to the ground.
   */
  clear(): void {
    try {
      mmkvStorage.clearAll();
    } catch {}
  },
};

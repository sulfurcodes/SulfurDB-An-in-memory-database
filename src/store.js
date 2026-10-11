import { performance } from "node:perf_hooks";

class Store {
  constructor({ now = () => performance.now() } = {}) {
    this.store = new Map();
    this.expirations = new Map();
    this.now = now;
  }

  #purgeIfExpired(key, currentTime = this.now()) {
    const expiresAt = this.expirations.get(key);
    if (expiresAt === undefined) {
      return false;
    }
    if (expiresAt > currentTime) {
      return false;
    }
    this.store.delete(key);
    this.expirations.delete(key);
    return true;
  }

  ttl(key) {
    if (key === "") {
      return "Key cannot be empty";
    }
    const currentTime = this.now();
    this.#purgeIfExpired(key, currentTime);
    if (!this.store.has(key)) {
      return -2;
    }
    if (!this.expirations.has(key)) {
      return -1;
    }
    const expiresAt = this.expirations.get(key);
    return Math.floor((expiresAt - currentTime) / 1000);
  }

  persist(key) {
    if (key === "") {
      return "Key cannot be empty";
    }
    this.#purgeIfExpired(key);
    if (!this.store.has(key)) {
      return 0;
    }
    return this.expirations.delete(key) ? 1 : 0;
  }

  ping() {
    return "PONG";
  }

  set(key, value, ttlSeconds = undefined) {
    if (key === "") {
      return "Key cannot be empty";
    }
    if (
      ttlSeconds !== undefined &&
      (!Number.isInteger(ttlSeconds) || ttlSeconds <= 0)
    ) {
      return "ERR invalid expire time";
    }
    this.store.set(key, value);
    if (ttlSeconds === undefined) {
      this.expirations.delete(key);
    } else {
      const expiresAt = this.now() + ttlSeconds * 1000;
      this.expirations.set(key, expiresAt);
    }
    return "OK";
  }

  get(key) {
    if (key === "") {
      return "Key cannot be empty";
    }
    this.#purgeIfExpired(key);
    return this.store.get(key) ?? null;
  }

  exists(key) {
    if (key === "") {
      return "Key cannot be empty";
    }
    this.#purgeIfExpired(key);
    return this.store.has(key);
  }

  delete(key) {
    if (key === "") {
      return "Key cannot be empty";
    }
    this.#purgeIfExpired(key);
    return this.store.delete(key) ? "Deleted" : "Key does not exist";
  }
}

export default Store;

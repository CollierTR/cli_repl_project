type Timeout = ReturnType<typeof setInterval>;

type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<unknown>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number = 0;
  #ttl: number;

  constructor(ttl: number, reapInterval: number = 30_000) {
    this.#interval = reapInterval;
    this.#ttl = ttl;

    this.#startReapLoop();
  }

  add<T>(key: string, value: T): void {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: value,
    };
    this.#cache.set(key, entry);
  }

  get<T>(key: string): undefined | T {
    const entry = this.#cache.get(key);
    if (!entry) {
      return undefined;
    }
    if (Date.now() - entry.createdAt > this.#ttl) {
      this.#cache.delete(key);
      return undefined;
    }
    return entry.val as T;
  }

  #reap() {
    for (const [key, value] of this.#cache) {
      const expiredBefore = Date.now() - this.#ttl;
      if (value.createdAt < expiredBefore) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}

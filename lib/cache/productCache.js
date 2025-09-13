// productCache.js
import { LRUCache } from 'lru-cache';

export const productCache = new LRUCache({
  max: 5000,           // enough for 2500 products
  ttl: 1000 * 60 * 5,  // cache for 5 minutes
});

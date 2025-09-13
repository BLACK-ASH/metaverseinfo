// orderCache.js
import { LRUCache } from 'lru-cache';

export const orderCache = new LRUCache({
  max: 2000,           // adjust based on expected number of orders
  ttl: 1000 * 60 * 5,  // 5 minutes cache duration
});

import NodeCache from 'node-cache';

// Create a cache instance with standard TTL of 1 hour
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

// Cache keys
export const CACHE_KEYS = {
  LATEST_RESULTS: 'latest_results',
  RESULTS_BY_DATE: (date: string) => `results_by_date_${date}`,
  ALL_RESULTS: 'all_results',
};

/**
 * Get data from cache
 * @param key - Cache key
 */
export function getFromCache<T>(key: string): T | undefined {
  return cache.get<T>(key);
}

/**
 * Set data in cache
 * @param key - Cache key
 * @param data - Data to cache
 * @param ttl - Time to live in seconds (optional, defaults to standard TTL)
 */
export function setCache<T>(key: string, data: T, ttl?: number): boolean {
  if (ttl !== undefined) {
    return cache.set(key, data, ttl);
  }
  return cache.set(key, data);
}

/**
 * Check if key exists in cache
 * @param key - Cache key
 */
export function hasCache(key: string): boolean {
  return cache.has(key);
}

/**
 * Delete a specific key from cache
 * @param key - Cache key
 */
export function deleteFromCache(key: string): number {
  return cache.del(key);
}

/**
 * Clear the entire cache
 */
export function clearCache(): void {
  cache.flushAll();
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return cache.getStats();
}

export default cache; 
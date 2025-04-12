# Caching System Documentation

This document describes the caching system implemented for the Daily Million Results website to reduce database requests and improve performance.

## Overview

The application uses an in-memory caching system based on the `node-cache` library. The cache stores the results of database queries with a configurable time-to-live (TTL) to avoid making redundant database calls.

## Cache Keys

The following cache keys are used:

- `latest_results`: Stores the latest results from all draws (TTL: 10 minutes)
- `results_by_date_{date}`: Stores results for a specific date (TTL: 1 hour)
- `all_results`: Stores all results when no date filter is applied (TTL: 10 minutes)

## Cache Invalidation API

A protected API endpoint is available for cache invalidation:

### GET /api/cache

Returns statistics about the current cache state.

```
curl -X GET https://yourdomain.com/api/cache \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### DELETE /api/cache

Clears the entire cache.

```
curl -X DELETE https://yourdomain.com/api/cache \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### DELETE /api/cache?key=latest_results

Clears a specific cache key.

```
curl -X DELETE https://yourdomain.com/api/cache?key=latest_results \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### DELETE /api/cache?key=results_by_date_2023-11-10

Clears cache for a specific date.

```
curl -X DELETE https://yourdomain.com/api/cache?key=results_by_date_2023-11-10 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Security

The cache API is protected by an API key that should be set in the environment variables:

```
CACHE_API_KEY=your-secret-key
```

This key must be provided in the `Authorization` header as a Bearer token for all cache API requests.

## When to Invalidate Cache

The cache should be invalidated in the following scenarios:

1. After new lottery results are imported into the database
2. After updating or correcting existing lottery results
3. If you make changes to the data schema or structure
4. If you suspect stale data is being served

## Cache Behavior

- If a cached item exists, the system will return the cached data without querying the database
- If no cached item exists, the system will query the database and store the result in the cache
- The cache is per-instance and does not persist across application restarts

## Logs

The caching system logs the following events:
- Cache hits and misses
- Database queries
- Cache invalidation actions 
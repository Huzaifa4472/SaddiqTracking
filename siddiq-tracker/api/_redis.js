import { Redis } from '@upstash/redis'

// Vercel's Redis (Upstash) marketplace integration has used a couple of different env
// var names over time depending on how the store was connected — check both.
export const redis = new Redis({
  url: process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN,
})

import { env } from '$env/dynamic/private'
import { getClient } from '../squidex-client/index.js'

export function getCachedClient(platform?: any) {
  const realEnv = platform?.env ?? env
  const squidex = getClient(platform)

  async function get (cacheKey: string) : Promise<any> {
    // Only attempt to use cache in server environments
    if (platform?.env?.KV) {
      const cachedHit = await platform.env.KV.get(cacheKey)
      if (cachedHit) {
        const hit = JSON.parse(cachedHit)
        if (hit && hit.expires > Date.now()) {
          // console.log(`Cache hit for ${cacheKey}`)
          return hit.data
        }
      }
    }
    return null
  }

  async function set (schema: string, result: any) : Promise<void> {
    // Only attempt to set cache in server environments
    if (platform?.env?.KV) {
      const cacheTtl = Date.now() + parseInt(realEnv.CONTENT_CACHE_TTL)
      await platform.env.KV.put(schema, JSON.stringify({data: result, expires: cacheTtl}))
      // console.log(`Cache set for '${schema}' until ${cacheTtl}`)
    }
  }

  async function getContents(schema: string, requestParameters?: any) {
    const cacheKey = schema
    let result = await get(cacheKey)
    if (result !== null) {
      return result
    }
    result = await squidex.contents.getContents(schema, requestParameters)
    set(cacheKey, result)
    return result
  }

  async function getAssets(requestParameters?: any) {
    const cacheKey = `asset-folder:${requestParameters.parentId}`
    let result = await get(cacheKey)
    if (result !== null) {
      return result
    }
    result = await squidex.assets.getAssets(requestParameters)
    set(cacheKey, result)
    return result
  }

  async function invalidate(prefix?: string) {
    if (!prefix) return

    // Only attempt to invalidate cache in server environments
    if (platform?.env?.KV) {
      await platform.env.KV.delete(prefix)
    }
  }

  return {
    getAssets,
    getContents,
    invalidate
  }
}
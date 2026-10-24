import { env } from '$env/dynamic/private'
import { getClient } from '../squidex-client/index.js'

export function getCachedClient(platform?: any) {
  const realEnv = platform?.env ?? env
  const cacheEngine = realEnv?.KV
  const squidex = getClient(platform)

  async function get (cacheKey: string) : Promise<any> {
    const cachedHit = await cacheEngine.get(cacheKey)

    if (!cachedHit) {
      return null
    }
    const hit = JSON.parse(cachedHit)
    
    if (!hit
      || hit.expires < Date.now()) {
      return null
    }
    // console.log(`Cache hit for ${cacheKey}`)
    return hit.data

  }

  async function set (schema: string, result: any) : Promise<void> {
    const cacheTtl = Date.now() + parseInt(realEnv.CONTENT_CACHE_TTL)
    cacheEngine.put(schema, JSON.stringify({data: result, expires: cacheTtl}))
    // console.log(`Cache set for '${schema}' until ${cacheTtl}`)
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

    await cacheEngine.delete(prefix)
  }

  return {
    getAssets,
    getContents,
    invalidate
  }
}
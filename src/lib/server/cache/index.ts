import { env } from '$env/dynamic/private'
import { getClient } from '../squidex-client/index.js'

const INSTANCE = crypto.randomUUID()
// const data = new Map<string, {data: any; expires: number}>

export function getCachedClient(platform?: any) {
  const realEnv = platform?.env ?? env
  const cacheEngine = realEnv?.KV
  const squidex = getClient(platform)

  const get = async (schema: string, requestParameters?: any) : Promise<any> => {
    const cachedHit = await cacheEngine.get(schema)
    const hit = JSON.parse(cachedHit)
    
    if (hit
      && hit.expires > Date.now()) {
      // console.log(`Cache hit for ${schema}`)
      return hit.data
    }

    const result = await squidex.contents.getContents(schema, requestParameters)
    const cacheTtl = Date.now() + parseInt(realEnv.CONTENT_CACHE_TTL)
    cacheEngine.put(schema, JSON.stringify({ data: result, expires: cacheTtl }))
    console.log(`Cache set for '${schema}' until ${cacheTtl} @ ${INSTANCE}`)
    return result
  }

  function invalidate(prefix?: string) {
    if (!prefix) return

    cacheEngine.delete(prefix)
  }

  return {
    get,
    invalidate
  }
}
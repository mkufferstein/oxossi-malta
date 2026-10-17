import { env } from '$env/dynamic/private'
import { getClient } from '../squidex-client/index.js'

const data = new Map<string, {data: any; expires: number}>

export function getCachedClient(platform?: any) {
  const realEnv = platform?.env ?? env
  const squidex = getClient(platform)

  const get = async (schema: string, requestParameters?: any) : Promise<any> => {
    const hit = data.get(schema)
    if (hit
      && hit.expires > Date.now()) {
      // console.log(`Cache hit for ${schema}`)
      return hit.data
    }

    const result = await squidex.contents.getContents(schema, requestParameters)
    const cacheTtl = Date.now() + parseInt(realEnv.CONTENT_CACHE_TTL)
    data.set(schema, { data: result, expires: cacheTtl });
    console.log(`Cache set for '${schema}' until ${cacheTtl}`)
    return result
  }

  function invalidate(prefix?: string) {
    if (!prefix) return data.clear()

    for (const key of data.keys()) {
      if (key.startsWith(prefix)) data.delete(key);
    }
  }

  return {
    get,
    invalidate
  }
}
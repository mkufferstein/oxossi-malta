import crypto, { sign } from 'node:crypto'

import { env } from '$env/dynamic/private'

import {
  error,
  json,
} from '@sveltejs/kit'

import type {
  RequestHandler,
} from '@sveltejs/kit'

import { 
  getCachedClient,
} from '$lib/server/index.js'


export const POST: RequestHandler = async ({ params, platform, request, setHeaders }) => {
  const realEnv = platform?.env ?? env

  const cachedClient = getCachedClient(platform)
  const raw = await request.text()
  const signature = request.headers.get('x-signature') ?? ''
  const expected = crypto.createHash('sha256').update(raw + realEnv.SQUIDEX_WEBHOOK_SECRET).digest('base64')

  if(signature.length !== expected.length
    || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    throw error(
      401,
      {
        message: 'invalid signature'
      }
    )
  }

  await cachedClient.invalidate(params?.schema)

  setHeaders({ 'cache-control': 'no-store' })
  return json(`${params?.schema} cleared`)
}

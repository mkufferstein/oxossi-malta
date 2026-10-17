import crypto from 'node:crypto'

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
} from '$lib/index.js'


export const POST: RequestHandler = async ({ params, platform, request, setHeaders }) => {
  const realEnv = platform?.env ?? env

  const cachedClient = getCachedClient(platform)
  const raw = await request.text()
  const signature = request.headers.get('X-Signature') ?? ''
  const expected = crypto.createHmac('sha256', realEnv.SQUIDEX_WEBHOOK_SECRET).update(raw).digest('hex')

  if(signature.length !== expected.length
    || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    throw error(
      401,
      {
        message: 'invalid signature'
      }
    )
  }

  const event = JSON.parse(raw)
  const schema = event.payload?.schemaId?.split(';').pop() ?? event.payload?.schemaId
  
  cachedClient.invalidate(schema)

  setHeaders({ 'cache-control': 'no-store' })
  return json('OK')
}

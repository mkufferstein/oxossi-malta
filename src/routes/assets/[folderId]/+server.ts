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


export const GET: RequestHandler = async ({ params, platform }) => {
  const cachedClient = getCachedClient(platform)

  const assets = await cachedClient.getAssets({ parentId: params?.folderId })
  return json(assets)
}

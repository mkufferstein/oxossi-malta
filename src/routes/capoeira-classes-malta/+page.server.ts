import { 
  getCachedClient,
} from '$lib/server/index.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
  const cachedClient = getCachedClient(platform)
  return {
    layout: await cachedClient.getContents('classes', {  }),
  }
}
import { 
  getCachedClient,
} from '$lib/index.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
  const cachedClient = getCachedClient(platform)
  return {
    layout: await cachedClient.get('workshops', {  }),
  }
}
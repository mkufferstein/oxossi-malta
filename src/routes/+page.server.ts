import { 
  getCachedClient,
} from '$lib/server/index.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
  try {
    const cachedClient = getCachedClient(platform)
    const layout = await cachedClient.getContents('home', {  })
    return {
      layout: layout,
    }
  } catch (error) {
    console.error('Error loading layout data:', error);
    // Return empty layout to prevent SSR failure
    return {
      layout: null,
    }
  }
}
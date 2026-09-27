import { 
  getClient,
} from '$lib/index.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
  const squidex = getClient(platform)
  return {
    social: await squidex.contents.getContents('social', { $orderby: 'data/order/iv' }),
  }
}
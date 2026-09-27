import { 
  Squidex,
} from '$lib/index.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  return {
    social: await Squidex.contents.getContents('social', { $orderby: 'data/order/iv' }),
  }
}
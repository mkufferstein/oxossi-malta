import { 
  Squidex,
} from '$lib/index.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  return {
    post: await Squidex.contents.getContents('classes', {  }),
    highlights: await Squidex.contents.getContents('classes-highlight', { $orderby: 'data/slot/iv' }),
  }
}
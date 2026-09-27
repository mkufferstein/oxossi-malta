import { 
  Squidex,
} from '$lib/index.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  return {
    layout: await Squidex.contents.getContents('axe-da-ilha', {  }),
  }
}
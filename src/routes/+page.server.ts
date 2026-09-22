import { 
  Squidex,
} from '$lib/index.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return {
		post: await Squidex.contents.getContents('home-page', {  }),
    highlights: await Squidex.contents.getContents('home-highlight', { $orderby: 'data/slot/iv' }),
	};
};
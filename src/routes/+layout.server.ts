import { 
  getCachedClient,
  getClient,
} from '$lib/server/index.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
  const cachedClient = getCachedClient(platform)

  const price = await cachedClient.getContents('price', {  }),
    training = await cachedClient.getContents('training', {  }),
    faqData = await cachedClient.getContents('faq', {  })

  let locationData,
    locations: string[] = [],
    typeData,
    types: string[] = []

  training.items.map(trainingPiece => {
    const locationId = trainingPiece?.data?.location?.iv?.[0]
    if (locations.indexOf(locationId) === -1) {
      locations.push(locationId)
    }

    const typeId = trainingPiece?.data?.type?.iv?.[0]
    if (types.indexOf(typeId) === -1) {
      types.push(typeId)
    }
  })

  locationData = await cachedClient.getContents('location')
  // if (locations.length > 0) {
  //   locationData = await cachedClient.getContents('location', { $filter: `id in ("${locations.join('", "')}")`})
  // }
  if (types.length > 0) {
    typeData = await cachedClient.getContents('trainingtype', { $filter: `id in ("${types.join('", "')}")`})
  }

  return {
    faqData,
    locationData,
    price,
    social: await cachedClient.getContents('social', { $orderby: 'data/order/iv' }),
    training,
    typeData,
  }
}
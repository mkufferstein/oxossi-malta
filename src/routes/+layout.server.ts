import { 
  getClient,
} from '$lib/index.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
  const squidex = getClient(platform)

  const price = await squidex.contents.getContents('price', {  }),
    training = await squidex.contents.getContents('training', {  })

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

  if (locations.length > 0) {
    locationData = await squidex.contents.getContents('location', { $filter: `id in ("${locations.join('", "')}")`})
  }
  if (types.length > 0) {
    typeData = await squidex.contents.getContents('trainingtype', { $filter: `id in ("${types.join('", "')}")`})
  }

  return {
    locationData,
    price,
    social: await squidex.contents.getContents('social', { $orderby: 'data/order/iv' }),
    training,
    typeData,
  }
}
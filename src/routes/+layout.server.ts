import { 
  getCachedClient,
  getClient,
} from '$lib/server/index.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
  const cachedClient = getCachedClient(platform)

  const currentDate = new Date()
  const endDate = new Date(),
    startDate = new Date()

  startDate.setDate(currentDate.getDate() - 1 )
  endDate.setDate(currentDate.getDate() + 14 )

  const price = await cachedClient.getContents('price', {  }),
    notices = await cachedClient.getContents(
      'notice',
      {
        $filter: {
          and: [
            { or: [
              { path: "data.displayFrom.iv", op: "ge", value: startDate.toISOString().slice(0, 10) + "T00:00:00Z" },
              { path: "data.displayFrom.iv", op: "ne", value: null },
            ]},
            { or: [
              { path: "data.displayUntil.iv", op: "ne", value: null },
              { path: "data.displayUntil.iv", op: "le", value: endDate.toISOString().slice(0, 10) + "T00:00:00Z" }
            ]}
          ]
        },
        $orderby: 'data/displayUntil/iv asc'
      }
    ),
    training = await cachedClient.getContents(
      'training',
      {
        $filter: {
          or: [
            { path: "data.repeatsOn.iv", op: "ne", value: null },
            { and: [
              { path: "data.date.iv", op: "ge", value: startDate.toISOString().slice(0, 10) + "T00:00:00Z" },
              { path: "data.date.iv", op: "le", value: endDate.toISOString().slice(0, 10) + "T00:00:00Z" }
            ]}
          ]
        },
      }
    ),
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
    notices,
    price,
    social: await cachedClient.getContents('social', { $orderby: 'data/order/iv' }),
    training,
    typeData,
  }
}
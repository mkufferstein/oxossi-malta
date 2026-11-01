import { env } from '$env/dynamic/public'

import { locationSchema } from './location.js'

const SITE_URL = `https://www.${env.PUBLIC_HOST}`

export function organizationSchema(locations) {
  return {
    '@type': 'SportsActivityLocation',
    '@id': `${SITE_URL}/#organization`,
    name: 'Axe da Ilha Capoeira Malta',
    url: SITE_URL,
    description:
      'Capoeira classes in Malta for adults and kids, all levels. ' +
      'Afro-Brazilian martial art with music and acrobatics. Mellieha and Pembroke.',
    telephone: '+35699910088',
    sport: ['Capoeira', 'Martial Arts'],
    location: locations?.map(locationSchema),
    employee: [
      {
        '@type': 'Person',
        name: 'Tartaruga Ninja',
        jobTitle: 'Instrutor',
        worksFor: { '@id': `${SITE_URL}/#organization` }
      },
      {
        '@type': 'Person',
        name: 'Portuguesa',
        jobTitle: 'Instrutora',
        worksFor: { '@id': `${SITE_URL}/#organization` }
      }
    ]
  }
}
import { env } from '$env/dynamic/public'

import {
  locale,
} from '$lib/locale/index.js'

const SITE_URL = `https://www.${env.PUBLIC_HOST}`

export function locationSchema(locationData) {
  const {
    address,
    city,
    country,
    location,
    name,
  } = locationData?.data

  return {
    '@type': 'Place',
    '@id': `${SITE_URL}/#${name?.[locale.get()]?.toLowerCase().replace(' ', '-')}`,
    name: name?.iv,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address?.[locale.get()]
        ?.replace(/\u200B/g, '')          // strip zero-width space
        .replace(/<[^>]*>/g, '\n')      // tags → line breaks
        .replace(/&nbsp;/g, ' ')
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean).
        join(', '),
      addressLocality: city?.[locale.get()],
      addressCountry: country?.[locale.get()]
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location?.iv?.latitude,
      longitude: location?.iv?.longitude
    }
  }
}
import { env } from '$env/dynamic/public'

const SITE_URL = `https://www.${env.PUBLIC_HOST}`

export function locationSchema(locationData) {
  const {
    address,
    city,
    location,
    name,
  } = locationData?.data

  return {
    '@type': 'Place',
    '@id': `${SITE_URL}/#${name?.iv?.toLowerCase().replace(' ', '-')}`,
    name: name?.iv,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address?.iv
        ?.replace(/\u200B/g, '')          // strip zero-width space
        .replace(/<[^>]*>/g, '\n')      // tags → line breaks
        .replace(/&nbsp;/g, ' ')
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean).
        join(', '),
      addressLocality: city?.iv,
      addressCountry: 'MT'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location?.iv?.latitude,
      longitude: location?.iv?.longitude
    }
  }
}
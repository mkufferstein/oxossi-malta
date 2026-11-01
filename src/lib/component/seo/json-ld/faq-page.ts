import { env } from '$env/dynamic/public'
import { page } from '$app/state'

import {
  COMPONENT_FAQ_LIST,
} from '../../types.js'

import { faqSchema } from './faq.js'

const SITE_URL = `https://www.${env.PUBLIC_HOST}`

export function faqPageSchema(faqData, layout) {

  const faqLists = layout.filter(l => l.schemaName === COMPONENT_FAQ_LIST)

  if (faqLists.length === 0) {
    return
  }

  const faqIds : string[] = []

  faqLists?.map(faqList => faqList?.faqs?.map(faqId => faqIds.push(faqId)))

  const faqs = faqData?.items?.filter(faqItem => faqIds.indexOf(faqItem.id) > -1)

  if (faqs.length === 0) {
    return
  }

  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${page?.url?.pathname || ''}#organization`,
    "mainEntity": faqs?.map(faqSchema)
  }
}



import {
  locale,
} from '$lib/locale/index.js'

export function faqSchema(faq) {
  const {
    question,
    answer,
  } = faq?.data

  return {
    "@type": "Question",
    "name": question?.[locale.get()],
    "acceptedAnswer": {
      "@type": "Answer",
      "text": answer?.[locale.get()]
    }
  }
}
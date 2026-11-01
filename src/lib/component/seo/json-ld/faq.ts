export function faqSchema(faq) {
  const {
    question,
    answer,
  } = faq?.data

  return {
    "@type": "Question",
    "name": question?.en,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": answer?.en
    }
  }
}
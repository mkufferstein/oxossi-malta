<script lang="ts">
  import type { PageProps } from './$types'

  import {
    Layout,
  } from '$lib/layout/index.js'

  import {
    Seo,
    faqPageSchema,
  } from '$lib/component/index.js'

  import './page.css'

  let { data }: PageProps = $props();

  const faqData = data?.faqData,
    layout = data?.layout?.[0]?.data?.content?.en,
    noticeData = data?.noticeData,
    seo = data?.layout?.[0]?.data?.seo?.en,
    locationData = data?.locationData,
    trainingData = data?.trainingData,
    typeData = data?.typeData
</script>

<Seo schema={faqPageSchema(faqData, layout)} settings={seo} />
<Layout {faqData}
  {layout}
  {locationData}
  {noticeData}
  {trainingData}
  {typeData} />
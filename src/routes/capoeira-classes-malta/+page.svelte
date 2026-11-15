<script lang="ts">
  import type { PageProps } from './$types'

  import {
    Seo,
    faqPageSchema,
  } from '$lib/component/index.js'

  import {
    Layout,
  } from '$lib/layout/index.js'

  import {
    locale,
  } from '$lib/locale/index.js'

  import './page.css'

  let { data }: PageProps = $props();

  const daysData = data?.daysData,
    faqData = data?.faqData,
    layout = data?.layout?.[0]?.data?.content?.[locale.get()],
    noticeData = data?.noticeData,
    seo = data?.layout?.[0]?.data?.seo?.[locale.get()],
    locationData = data?.locationData,
    trainingData = data?.trainingData,
    typeData = data?.typeData
</script>

<Seo schema={faqPageSchema(faqData, layout)} settings={seo} />
<Layout {daysData}
  {faqData}
  {layout}
  {locationData}
  {noticeData}
  {trainingData}
  {typeData} />
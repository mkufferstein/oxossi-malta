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
    layout = data?.layout?.items?.[0]?.data?.content?.en,
    noticeData = data?.notices,
    seo = data?.layout?.items?.[0]?.data?.seo?.en,
    locationData = data?.locationData,
    training = data?.training,
    typeData = data?.typeData
</script>

<Seo schema={faqPageSchema(faqData, layout)} settings={seo} />
<Layout {faqData}
  {layout}
  {locationData}
  {noticeData}
  {training}
  {typeData} />
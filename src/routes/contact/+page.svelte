<script lang="ts">
  import type { PageProps } from './$types'

  import {
    Layout,
  } from '$lib/layout/index'

  import {
    Seo,
    faqPageSchema,
    organizationSchema,
  } from '$lib/component/index.js'

  import './page.css'

  let { data }: PageProps = $props();

  const faqData = data?.faqData,
    layout = data?.layout?.[0]?.data?.content?.en,
    locationData = data?.locationData,
    seo = data?.layout?.[0]?.data?.seo?.en
</script>

<Seo schema={[organizationSchema(locationData), faqPageSchema(faqData, layout)]} settings={seo} />
<Layout {faqData}
  {layout}
  {locationData} />
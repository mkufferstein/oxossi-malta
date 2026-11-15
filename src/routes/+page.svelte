<script lang="ts">
  import type { PageProps } from './$types'
  
  import {
    organizationSchema,
    Seo,
   } from '$lib/component/index.js'

  import {
    Layout,
  } from '$lib/layout/index'

  import {
    locale,
  } from '$lib/locale/index.js'

  import './page.css'

  let { data }: PageProps = $props();

  const layout = data?.layout?.[0]?.data?.content?.[locale.get()],
    locationData = data?.locationData,
    seo = data?.layout?.[0]?.data?.seo?.[locale.get()]
</script>

<Seo schema={organizationSchema(locationData)} settings={seo} />
<Layout {layout} />
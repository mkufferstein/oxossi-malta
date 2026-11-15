<script lang="ts">
  import type { PageProps } from './$types'

  import {
    Seo,
  } from '$lib/component/index.js'

  import {
    Layout,
  } from '$lib/layout/index'

  import {
    locale,
  } from '$lib/locale/index.js'

  import './page.css'

  let { data }: PageProps = $props()

  const layout = data?.layout?.[0]?.data?.content?.[locale.get()],
    seo = data?.layout?.[0]?.data?.seo?.[locale.get()],
    locationData = data?.locationData
</script>

<Seo settings={seo} />
<Layout {layout} {locationData} />
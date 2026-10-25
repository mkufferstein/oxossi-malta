<script lang="ts">
  import type { PageProps } from './$types'

  import {
    Layout,
  } from '$lib/layout/index'

  import {
    Seo,
   } from '$lib/component/index.js'

  import './page.css'

  let { data }: PageProps = $props();

  const layout = data?.layout?.items?.[0]?.data?.content?.en,
    seo = data?.layout?.items?.[0]?.data?.seo?.en
</script>

<Seo settings={seo} />
<Layout {layout} />
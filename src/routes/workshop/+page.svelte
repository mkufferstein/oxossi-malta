<script lang="ts">
  import type { PageProps } from './$types'

  import { env } from '$env/dynamic/public'

  import {
    Layout,
  } from '$lib/layout/index'

  import {
    COMPONENT_HERO,
    COMPONENT_HIGHLIGHTS,
   } from '$lib/component/index.js'

  // import './page.css'

  let { data }: PageProps = $props();

  const layout = data?.layout?.items?.[0]?.data?.content?.en

</script>

<svelte:head>
  <title>Axe da Ilha in Malta</title>
  <meta property="og:title" content="Axe da Ilha Workshops in Malta" />
  <meta property="og:description" content="Capoeira Workshop coming soon 1 March 2026 - Mestre Ratinho from Salvador de Bahia, Brazil 10am-1pm" />
  <meta property="og:url" content="https://www.capoeiramalta.com/workshop" />

  <meta name="description" content="Capoeira Workshop coming soon 1 March 2026 - Mestre Ratinho from Salvador de Bahia, Brazil 10am-1pm" />
  <meta name="keywords" content="capoeira, workshop, malta" />
</svelte:head>

<Layout {layout} />
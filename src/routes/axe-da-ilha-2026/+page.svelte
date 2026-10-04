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

  import './page.css'

  let { data }: PageProps = $props();

  const layout = data?.layout?.items?.[0]?.data?.content?.en

  let heroBanner = layout.find(c => c.schemaName === COMPONENT_HERO),
    highlights = layout.find(c => c.schemaName === COMPONENT_HIGHLIGHTS)
</script>

<svelte:head>
  <title>Axe da Ilha Capoeira Festival in Malta</title>
  <meta property="og:title" content="Axe da Ilha Capoeira Festival in Malta" />
  <meta property="og:description" content="2rd-4th October 2026 Annual International Capoeira Event in Malta" />
  <meta property="og:url" content="https://www.capoeiramalta.com/axe-da-ilha-2026" />

  <meta name="description" content="2rd-4th October 2026 Annual International Capoeira Event in Malta" />
  <meta name="keywords" content="Annual, largest, International, Capoeira, Event, Malta" />
</svelte:head>

<Layout {layout} />
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
  <meta property="og:title" content="Axe da Ilha in Malta" />
  <meta property="og:description" content="Discover the philosophy of Oxossi Capoeira and who is Istrutor Tartaruga Ninja" />
  <meta property="og:url" content="https://www.capoeiramalta.com/about-axe-da-ilha" />

  <meta name="description" content="Discover the philosophy of Oxossi Capoeira and who is Istrutor Tartaruga Ninja" />
  <meta name="keywords" content="Oxossi, Capoeira, Malta, Tartaruga, Ninja, about, who is" />
</svelte:head>

<Layout {layout} />
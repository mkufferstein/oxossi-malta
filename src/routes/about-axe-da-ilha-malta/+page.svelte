<script lang="ts">
  import type { PageProps } from './$types'

  import {
    Seo,
  } from '$lib/component/index.js'

  import {
    Layout,
  } from '$lib/layout/index.js'

  import {
    locale,
  } from '$lib/locale/index.js'

  let { data }: PageProps = $props();

  const layout = data?.layout?.[0]?.data?.content?.[locale.get()],
    seo = data?.layout?.[0]?.data?.content?.[locale.get()]

</script>

<svelte:head>
  <title>Axe da Ilha in Malta</title>
  <meta property="og:title" content="Axe da Ilha in Malta" />
  <meta property="og:description" content="Discover the philosophy of Oxossi Capoeira and who is Instrutor Tartaruga Ninja" />
  <meta property="og:url" content="https://www.capoeiramalta.com/about-axe-da-ilha" />

  <meta name="description" content="Discover the philosophy of Oxossi Capoeira and who is Instrutor Tartaruga Ninja" />
  <meta name="keywords" content="Oxossi, Capoeira, Malta, Tartaruga, Ninja, about, who is" />
</svelte:head>

<Seo settings={seo} />
<Layout {layout} />
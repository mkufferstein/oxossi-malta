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

  let heroBanner = layout.find(c => c.schemaName === COMPONENT_HERO),
    highlights = layout.find(c => c.schemaName === COMPONENT_HIGHLIGHTS)
</script>

<svelte:head>
  <title>Contact</title>
  <meta property="og:title" content="Contact" />
  <meta property="og:description" content="How to contact us and where to find us. Follow us on social media." />
  <meta property="og:url" content="https://www.capoeiramalta.com/contact" />

  <meta name="description" content="How to contact us and where to find us. Follow us on social media." />
  <meta name="keywords" content="contact, find, capoeira, malta, where, follow, social media" />
</svelte:head>

<Layout {layout} />
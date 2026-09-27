<script lang="ts">
  import type { PageProps } from './$types'

  import { env } from '$env/dynamic/public'

  import {
    Layout,
  } from '$lib/layout/index'

  import {
    Training,
  } from '$lib/component/index'

  import {
    COMPONENT_HERO,
    COMPONENT_HIGHLIGHTS,
   } from '$lib/component/index.js'

  import './page.css'

  let { data }: PageProps = $props();

  const layout = data?.layout?.items?.[0]?.data?.content?.en,
    locationData = data?.locationData,
    training = data?.training,
    typeData = data?.typeData

  let heroBanner = layout.find(c => c.schemaName === COMPONENT_HERO),
    highlights = layout.find(c => c.schemaName === COMPONENT_HIGHLIGHTS)
</script>

<svelte:head>
  <meta property="og:title" content="Axe Da Ilha Capoeira Malta" />
  <meta property="og:description" content="Afro-Brazilian martial-art, with traditional music, energy, body communication, acrobatics, dance, combat, community, harmony, elegance, balance... Capoeira Is all of this and more! Welcome to the family." />
  <meta property="og:image" content={env.PUBLIC_SQUIDEX_ENVIRONMENT + env.PUBLIC_SQUIDEX_ASSETS + heroBanner?.banner} />
  {#each highlights?.list as highlight}
    <meta property="og:image" content={env.PUBLIC_SQUIDEX_ENVIRONMENT + env.PUBLIC_SQUIDEX_ASSETS + highlight.banner} />
  {/each}
  <meta property="og:url" content="https://www.capoeiramalta.com/" />

  <meta name="description" content="Afro-Brazilian martial-art, with traditional music, energy, body communication, acrobatics, dance, combat, community, harmony, elegance, balance... Capoeira Is all of this and more! Welcome to the family." />
  <meta name="keywords" content="Capoeira, Brazil, Brazilian, Martial, art, combat, culture, training, lessons" />
</svelte:head>

<Layout {layout} />
<div class="primary">
  <section class="container">
    <Training locationData={locationData?.items} training={training?.items} typeData={typeData?.items} />
  </section>
</div>
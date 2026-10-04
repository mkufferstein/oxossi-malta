<script lang="ts">
  import type { PageProps } from './$types'

  import { env } from '$env/dynamic/public'

  import {
    Layout,
  } from '$lib/layout/index'

  import {
    COMPONENT_HERO,
    COMPONENT_HIGHLIGHTS,
    Location,
    Training,
  } from '$lib/component/index'

  import {
    modal,
   } from '$lib/modal/index.js'

  // import './page.css'

  let { data }: PageProps = $props();

  const layout = data?.layout?.items?.[0]?.data?.content?.en,
    locationData = data?.locationData,
    training = data?.training,
    typeData = data?.typeData

  let heroBanner = layout.find(c => c.schemaName === COMPONENT_HERO),
    highlights = layout.find(c => c.schemaName === COMPONENT_HIGHLIGHTS)
</script>

<svelte:head>
  <title>Capoeira Classes in Malta</title>
  <meta property="og:title" content="Capoeira Classes in Malta" />
  <meta property="og:description" content="Capoeria classes schedule - available in Mellieha and Pembroke" />
  <meta property="og:url" content="https://www.capoeiramalta.com/capoeira-classes-malta" />

  <meta name="description" content="Capoeria classes schedule - available in Mellieha and Pembroke" />
  <meta name="keywords" content="capoeira, classes, sessions, training, malta, mellieha, pembroke" />
</svelte:head>

<Layout {layout} />
<div class="primary">
  <section class="container" id="training">
    <Training locationData={locationData?.items} training={training?.items} typeData={typeData?.items} />
  </section>
</div>
<section class="container">
  <h1>How to get there?</h1>
</section>
<section class="container" id="location">
  {#each locationData?.items as location}
    <Location {location} />
  {/each}
</section>
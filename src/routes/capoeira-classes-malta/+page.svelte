<script lang="ts">
  import type { PageProps } from './$types'

  import {
    Layout,
  } from '$lib/layout/index'

  let { data }: PageProps = $props();

  const layout = data?.layout?.items?.[0]?.data?.content?.en,
    locationData = data?.locationData,
    training = data?.training,
    typeData = data?.typeData
</script>

<svelte:head>
  <title>Capoeira Classes in Malta</title>
  <meta property="og:title" content="Capoeira Classes in Malta" />
  <meta property="og:description" content="Capoeria classes schedule - available in Mellieha and Pembroke" />
  <meta property="og:url" content="https://www.capoeiramalta.com/capoeira-classes-malta" />

  <meta name="description" content="Capoeria classes schedule - available in Mellieha and Pembroke" />
  <meta name="keywords" content="capoeira, classes, sessions, training, malta, mellieha, pembroke" />
</svelte:head>

<Layout {layout}
  {locationData}
  {training}
  {typeData} />
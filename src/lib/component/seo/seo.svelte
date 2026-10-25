<script lang="ts">
  import { env } from '$env/dynamic/public'
  import { page } from '$app/state'

  const {
    settings = {}
  }= $props()

  const {
    description = '',
    images,
    title = '',
  } = settings

  const site = 'https://www.' + env.PUBLIC_HOST
</script>

<svelte:head>
  {#if title}
    <title>{title}</title>
    <meta property="og:title" content={title} />
  {/if}
  {#if description}
    <meta name="description" content={description} /> 
    <meta property="og:description" content={description} />
  {/if}

  <link rel="canonical" href={site + page?.url?.pathname || ''} />
  <meta property="og:url" content={site + page?.url?.pathname || ''} />

  {#each images as image}
    <meta property="og:image" content={env.PUBLIC_SQUIDEX_ENVIRONMENT + env.PUBLIC_SQUIDEX_ASSETS + image + '?width=1200&height=630'} />
  {/each}
</svelte:head>
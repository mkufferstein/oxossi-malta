<script lang="ts">
  import {
    COMPONENT_HERO,
    COMPONENT_HIGHLIGHTS,
    COMPONENT_PARAGRAPH,
    HeroBanner,
    Highlights,
    Paragraph,
  } from '../component/index.js'

  const {
    layout,
  } = $props()
</script>

{#each layout as component}
  {#if component?.schemaName === COMPONENT_HERO}
    <HeroBanner heroBanner={component} />
  {/if}
  {#if component?.schemaName === COMPONENT_HIGHLIGHTS}
    <Highlights highlights={component?.list} />
  {/if}
  {#if component?.schemaName === COMPONENT_PARAGRAPH}
    <Paragraph paragraph={component} />
  {/if}
{/each}
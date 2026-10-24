<script lang="ts">
  import {
    COMPONENT_ASSET_FOLDER,
    COMPONENT_HERO,
    COMPONENT_HIGHLIGHTS,
    COMPONENT_INSTAGRAM,
    COMPONENT_PARAGRAPH,
    AssetFolder,
    HeroBanner,
    Highlights,
    Instagram,
    Paragraph,
  } from '../component/index.js'

  const {
    layout,
    instagramData = undefined,
  } = $props()
</script>

{#each layout as component}
  {#if component?.schemaName === COMPONENT_ASSET_FOLDER}
    <AssetFolder imageBrowser={component} />
  {/if}
  {#if component?.schemaName === COMPONENT_HERO}
    <HeroBanner heroBanner={component} />
  {/if}
  {#if component?.schemaName === COMPONENT_HIGHLIGHTS}
    <Highlights highlights={component?.list} />
  {/if}
  {#if component?.schemaName === COMPONENT_INSTAGRAM}
    <Instagram instagramData={instagramData} />
  {/if}
  {#if component?.schemaName === COMPONENT_PARAGRAPH}
    <Paragraph paragraph={component} />
  {/if}
{/each}
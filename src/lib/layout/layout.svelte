<script lang="ts">
  import {
    COMPONENT_ASSET_FOLDER,
    COMPONENT_HERO,
    COMPONENT_HIGHLIGHTS,
    COMPONENT_LOCATIONS,
    COMPONENT_PARAGRAPH,
    COMPONENT_TRAINING,
    AssetFolder,
    HeroBanner,
    Highlights,
    LocationList,
    Paragraph,
    TrainingComponent
  } from '../component/index.js'

  const {
    layout,
    ...passthrough
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
  {#if component?.schemaName === COMPONENT_LOCATIONS}
    <LocationList settings={component}
      locationData={passthrough?.locationData} />
  {/if}
  {#if component?.schemaName === COMPONENT_PARAGRAPH}
    <Paragraph paragraph={component} />
  {/if}
  {#if component?.schemaName === COMPONENT_TRAINING}
    <TrainingComponent settings={component}
      locationData={passthrough?.locationData} 
      training={passthrough?.training} 
      typeData={passthrough?.typeData} />
  {/if}
{/each}
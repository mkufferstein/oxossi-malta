<script lang="ts">
  import Location from '../location/location.svelte'

  const {
    locationData,
    settings,
  } = $props()

  let activeLocations = $derived(settings?.locations.map(
    (location: string) =>
      locationData?.items.find(currentLocation => currentLocation.id === location )
    )
  )
</script>

<div class="{settings?.theme?.theme}">
  <section class="container" id={settings?.id} >
    {#if settings?.title}
      <h1>{settings.title}</h1>
    {/if}
    {@html settings?.description}
    {#each activeLocations as activeLocation}
      <Location location={activeLocation} />
    {/each}
    {#if settings?.cta}
      <a href="{settings?.cta?.link}" class="secondary">{settings?.cta?.text}</a>
    {/if}
  </section>
</div>
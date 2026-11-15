<script lang="ts">
  import Training from '../training/training.svelte'

  const {
    daysData,
    locationData,
    noticeData,
    settings,
    trainingData,
    typeData,
  } = $props()
</script>

<div class="{settings?.theme?.theme}">
  <section class="container" id={settings?.id} >
    {#if settings?.title}
      <h1>{settings.title}</h1>
    {/if}
    {@html settings?.description}
    <Training {daysData}
      {locationData}
      {noticeData}
      {trainingData}
      {typeData} />
    {#if settings?.cta}
      <a href="{settings?.cta?.link}" class="secondary">{settings?.cta?.text}</a>
    {/if}
  </section>
</div>
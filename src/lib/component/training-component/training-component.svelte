<script lang="ts">
  import Training from '../training/training.svelte'

  const {
    settings,
    locationData,
    noticeData,
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
    <Training locationData={locationData}
      noticeData={noticeData}
      trainingData={trainingData}
      typeData={typeData} />
    {#if settings?.cta}
      <a href="{settings?.cta?.link}" class="secondary">{settings?.cta?.text}</a>
    {/if}
  </section>
</div>
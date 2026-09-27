<script lang="ts">
  import { env } from '$env/dynamic/public'

  import './highlights.css'

  const {
    highlights
  } = $props()

</script>
<div class="highlights" id={highlights?.id}>
  <section class="container">
    {#each highlights as highlight}
      <img src={env.PUBLIC_SQUIDEX_ENVIRONMENT + env.PUBLIC_SQUIDEX_ASSETS + highlight?.banner?.[0] } alt={highlight?.title} />
      <div class="highlight">
        <h1>
          {highlight?.title}
        </h1>
        <h2>
          {highlight?.description}
        </h2>
        {#if highlight?.cta}
          <a href={highlight?.cta?.link}>{highlight?.cta?.text}</a>
        {/if}
      </div>
    {/each}
  </section>
</div>
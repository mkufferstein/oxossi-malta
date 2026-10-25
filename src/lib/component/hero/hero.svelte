<script lang="ts">
  import { env } from '$env/dynamic/public'

  import './hero.css'

  const {
    heroBanner,
  } = $props()

</script>

{#if heroBanner}
  <div class="hero" id={heroBanner.id}>
    {#if heroBanner.banner?.[0]}
      <img src={env.PUBLIC_SQUIDEX_ENVIRONMENT + env.PUBLIC_SQUIDEX_ASSETS + heroBanner.banner[0]} alt="Axe da Ilha - Capoeira Malta"/>
    {/if}
    <section class="container">
      <h1>{heroBanner.title}</h1>
      <h2>{heroBanner.subTitle}</h2>
      <a href="{heroBanner.cta?.link}" class="secondary">{heroBanner.cta?.text}</a>
    </section>
  </div>
{/if}
<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'
  import type { PageProps } from './$types'

  const squidexDomain = "https://cloud.squidex.io/api/assets/oxossi-malta/"

  let { data }: PageProps = $props();

  let classes = data.post.items[0].data,
    highlights = data.highlights.items
console.log(highlights)
</script>
<section class="container introduction">
  <h1>{classes.title.en}</h1>
  <h2>{classes['sub-title'].en}</h2>
  <SvelteMarkdown source={classes.description.en} />
</section>
<div class="highlights">
  <section class="container">
    {#each highlights as highlight}
      <img src={squidexDomain + highlight.data.banner.iv } alt={highlight.data.title.en} />
      <div class="highlight">
        <h1>
          {highlight.data.title.en}
        </h1>
        <h2>
          {highlight.data.description.en}
        </h2>
        {#if highlight.data.ctaText.en}
          <a href="">{highlight.data.ctaText.en}</a>
        {/if}
      </div>
    {/each}
  </section>
</div>
<section class="container">
  <SvelteMarkdown source={classes.introDescription?.en} />
</section>
<div class="htg">
</div>
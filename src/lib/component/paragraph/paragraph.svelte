<script lang="ts">

  import './paragraph.css'

  const {
    paragraph,
  } = $props()
</script>

<div class="{paragraph?.theme?.theme}">
  <section class="container" id={paragraph?.id} >
    {#if paragraph?.title}
      <h1>{paragraph.title}</h1>
    {/if}
    {@html paragraph?.description}
    {#if paragraph?.cta}
      <a href="{paragraph?.cta?.link}" class="secondary">{paragraph?.cta?.text}</a>
    {/if}
  </section>
</div>
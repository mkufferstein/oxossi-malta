<script lang="ts">
  import './faq-list.css'

  const {
    faqData,
    settings,
  } = $props()

  let activeFaqs = $derived(settings?.faqs.map(
    (faq: string) =>
      faqData?.items.find(currentFaq => currentFaq.id === faq )
    )
  )

// $inspect(activeFaqs)
</script>

<div class="{settings?.theme?.theme}">
  <section class="container" id={settings?.id} >
    {#if settings?.title}
      <h1>{settings.title}</h1>
    {/if}
    {@html settings?.description}
    {#each activeFaqs as f}
      <details>
        <summary>
          <h2>{f?.data?.question?.en}</h2>
          <span class="toggle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </span>
        </summary>
        <p>{@html f?.data?.answer?.en}</p>
      </details>
    {/each}
    {#if settings?.cta}
      <a href="{settings?.cta?.link}" class="secondary">{settings?.cta?.text}</a>
    {/if}
  </section>
</div>
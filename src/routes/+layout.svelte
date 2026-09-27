<script lang="ts">
  import { page } from '$app/stores'

  import { env } from '$env/dynamic/public'

  import favicon from '$lib/assets/favicon.svg';
  import './layout.css'

  let { children, data } = $props();

  const {
    social
  } = data

  let isMenuOpen: boolean = $state(false)

  let classList : string[] = $derived.by(() => {
    const classList = ['hamburger']
    classList.push((isMenuOpen) ? 'iconoir-xmark' : 'iconoir-menu')
    return classList
  })

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen
  }

  $effect(() => {
    if ($page.url.pathname) {
      isMenuOpen = false
    }
  })
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Axe da Ilha</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css">
</svelte:head>

<!-- Navigation -->
<nav class="navbar">
    <div class="container" class:open={isMenuOpen}>
        <a href="/" class="logo"></a>
        <ul class="nav-links">
            <li><a href="/capoeira-classes-malta">Classes</a></li>
            <li><a href="/axe-da-ilha-2026">1˚ Axe da Ilha Festival</a></li>
            <li><a href="/workshop">Workshops</a></li>
            <li><a href="/about-axe-da-ilha-malta">About</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
        <a href="#" class="secondary">Schedule</a>
        <span class={classList.join(' ')} onclick={toggleMenu}></span>
    </div>
</nav>

<!-- Main Content -->
<main class="main">
  {@render children?.()}
</main>

<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div class="social-links">
      {#each social?.items as socialLink}
        <a href={socialLink?.data?.cta?.iv?.link} target="_blank">
          <img src={env.PUBLIC_SQUIDEX_ENVIRONMENT + env.PUBLIC_SQUIDEX_ASSETS + socialLink?.data?.icon?.iv?.[0]} alt={socialLink?.data?.cta?.iv?.text}/>
          {socialLink?.data?.cta?.iv?.text}
        </a>
      {/each}
    </div>
    <p>&copy; 2025 Capoeira Oxossi Malta. All rights reserved.</p>
  </div>
</footer>

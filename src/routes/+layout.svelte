<script lang="ts">
  import { page } from '$app/stores'

  import { env } from '$env/dynamic/public'

  import favicon from '$lib/assets/favicon.svg';

  import {
    modal,
  } from '$lib/modal/index.js'

  import './layout.css'

  let { children, data } = $props();

  const {
    notices,
    social
  } = data

  let isMenuOpen: boolean = $state(false),
    currentNoticeIndex: number = $state(0),
    interval: Timeout = $state(0),
    startX: number = 0,
    endX: number = 0

  let classList : string[] = $derived.by(() => {
    const classList = ['hamburger']
    classList.push((isMenuOpen) ? 'iconoir-xmark' : 'iconoir-menu')
    return classList
  }),
    headerNotices = $derived(notices?.items?.filter((notice: any) => notice?.data?.isVisibleInHeader?.iv))

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen
  }

  const closeModal = () => {
    modal.clear()
  }

  const navigateNotice = (direction: number) => {
    if (!headerNotices || headerNotices.length <= 1) return;
    
    if (direction === 1) {
      // Next notice
      currentNoticeIndex = (currentNoticeIndex + 1) % headerNotices.length;
    } else {
      // Previous notice
      currentNoticeIndex = (currentNoticeIndex - 1 + headerNotices.length) % headerNotices.length;
    }
  }

  // Handle swipe gestures
  const handleTouchStart = (e: TouchEvent) => {
    startX = e.touches[0].clientX;
  }

  const handleTouchMove = (e: TouchEvent) => {
    endX = e.touches[0].clientX;
  }

  const handleTouchEnd = () => {
    if (!headerNotices || headerNotices.length <= 1) return;
    
    const swipeThreshold = 50; // Minimum swipe distance in pixels
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next notice
        navigateNotice(1);
      } else {
        // Swipe right - previous notice
        navigateNotice(-1);
      }
    }
  }

  // Handle mouse events for desktop swipe simulation
  const handleMouseDown = (e: MouseEvent) => {
    startX = e.clientX;
  }

  const handleMouseMove = (e: MouseEvent) => {
    endX = e.clientX;
  }

  const handleMouseUp = () => {
    if (!headerNotices || headerNotices.length <= 1) return;
    
    const swipeThreshold = 50; // Minimum swipe distance in pixels
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next notice
        navigateNotice(1);
      } else {
        // Swipe right - previous notice
        navigateNotice(-1);
      }
    }
  }

  // Auto-rotate notices every 5 seconds
  $effect(() => {
    if (!headerNotices || headerNotices.length <= 1) return;
    
    interval = setInterval(() => {
      currentNoticeIndex = (currentNoticeIndex + 1) % headerNotices.length;
    }, 5000);
    
    return () => clearInterval(interval);
  })

  $effect(() => {
    if ($page.url.pathname) {
      isMenuOpen = false
    }
  })

  $inspect('HN', headerNotices)
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Axe Da Ilha Capoeira Malta</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css">
</svelte:head>

<!-- Navigation -->
<nav class="navbar">
    <div class="container" class:open={isMenuOpen}>
        <a class="logo" href="/" title="Axe da Ilha Main page">
          <img alt="Axe da Ilha logo" class="logo" src="img/adi.png" />
        </a>
        <ul class="nav-links">
            <li><a href="/capoeira-classes-malta">Classes</a></li>
            <li><a href="/axe-da-ilha-2026">1˚ Axe da Ilha Festival</a></li>
            <li><a href="/workshop">Workshops</a></li>
            <li><a href="/about-axe-da-ilha-malta">About</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
        <a href="/capoeira-classes-malta#training" class="secondary">Schedule</a>
        <span class={classList.join(' ')} onclick={toggleMenu}></span>
    </div>
</nav>

<!-- Main Content -->
<main class="main">
  {#if headerNotices && headerNotices.length > 0}
    <div 
      class="notice-slider"
      ontouchstart={handleTouchStart}
      ontouchmove={handleTouchMove}
      ontouchend={handleTouchEnd}
      onmousedown={handleMouseDown}
      onmousemove={handleMouseMove}
      onmouseup={handleMouseUp}
      onmouseleave={handleMouseUp}
    >
      <div class="notice-content">
        {headerNotices[currentNoticeIndex]?.data?.title?.iv}
      </div>
      {#if headerNotices.length > 1}
        <div class="notice-dots">
          {#each headerNotices as _, index}
            <span class="dot {index === currentNoticeIndex ? 'active' : ''}" 
                  onclick={() => currentNoticeIndex = index}></span>
          {/each}
        </div>

      {/if}
    </div>
  {/if}
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
    <p>&copy; 2025 Axe da Ilha - Capoeira Malta. All rights reserved.</p>
  </div>
</footer>

{#if modal?.component}
  {@const ModalComponent = modal.component}
  <div id="modal">
    <div id="modalControl">
      <span class="modal-spacer"></span>
      {#each modal?.controls as control}
        <div class={control.class + " modal-control"} onclick={control.callback as () => void}></div>
      {/each}
      <span class="modal-spacer"></span>
      <div class="iconoir-xmark modal-control" onclick={closeModal}></div>
    </div>
    <section class="container">
      <ModalComponent {...modal.properties}/>
    </section>
  </div>
{/if}

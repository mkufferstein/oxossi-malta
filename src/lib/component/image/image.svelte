<script lang="ts">
  import { env } from '$env/dynamic/public'
  import {
    noop,
  } from '$lib/index.js'

  import './image.css'

  let {
    image,
    next = noop,
    previous = noop
  } = $props()

  let height = $derived(image.pixelWidth > image.pixelHeight ? 720 : 1280),
    startX = $state(0)

  function handleTouchStart(e: TouchEvent) {
    startX = e.touches[0].clientX
  }

  function handleTouchMove(e: TouchEvent) {
    if (!startX) return
  }

  function handleTouchEnd(e: TouchEvent) {
    if (!startX) return
    
    const endX = e.changedTouches[0].clientX
    
    const diffX = startX - endX
    
    if (diffX > 50) {
      next()
    } else if (diffX < -50) {
      previous()
    }
    
    startX = 0
  }
</script>

<div class="asset-image" 
  ontouchstart={handleTouchStart}
  ontouchmove={handleTouchMove}
  ontouchend={handleTouchEnd}>
  <a href={env.PUBLIC_SQUIDEX_ENVIRONMENT + env.PUBLIC_SQUIDEX_ASSETS + image?.slug} target="_blank">
    <img 
      class="image-element"
      alt="{image?.metadata?.description}"
      src={env.PUBLIC_SQUIDEX_ENVIRONMENT + env.PUBLIC_SQUIDEX_ASSETS + image?.slug + '?height=' + height}
      />
  </a>
</div>
<script lang="ts">
  import { onMount } from 'svelte'
  import { env } from '$env/dynamic/public'

  import {
    modal,
  } from '$lib/modal/index.js'

  import Image from '../image/image.svelte'

  import './assets-folder.css'

  let { assets = $bindable(), imageBrowser } = $props()

  onMount(async () => {
    const result = await fetch(`/assets/${imageBrowser?.folder}`)
    assets = await result.json()
  })

  function setImageModal(index: number) {
    if (!assets?.items?.[index]) {
      modal.clear()
      return
    }
    modal.component = Image
    modal.controls = []
    if (assets?.items?.[index - 1]) {
      modal.controls.push({
        callback: () => setImageModal(index - 1),
        class: 'iconoir-arrow-left',
      })
    }
    if (assets?.items?.[index + 1]) {
      modal.controls.push({
        callback: () => setImageModal(index + 1),
        class: 'iconoir-arrow-right',
      })
    }
    modal.properties = {
      image: assets?.items?.[index],
    }
  }

  // console.log('ASS', imageBrowser)
  const loadImage = (event: Event) => {
    const target = event.currentTarget as HTMLImageElement
    const index = parseInt(target.dataset?.index)
    setImageModal(index)
  }
</script>

<div class="{imageBrowser?.theme?.theme}">
  <section class="container" id={imageBrowser?.id} >
    <div class="assets-folder">
      {#if imageBrowser?.title}
        <h1>{imageBrowser?.title}</h1>
      {/if}
      <div class="assets-folder-list">
        {#each assets?.items as asset, index (asset.id)}
          <div class="asset-item"
            data-index={index}
            onclick={loadImage}
            onkeyup={loadImage}
            role="button"
            tabindex="0" >
            <img alt="{asset?.metadata?.description}"
              src={env.PUBLIC_SQUIDEX_ENVIRONMENT + env.PUBLIC_SQUIDEX_ASSETS + asset?.slug + '?width=160&height=120'}
              />
          </div>
        {/each}
      </div>
    </div>
  </section>
</div>
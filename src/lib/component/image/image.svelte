<script lang="ts">
  import { env } from '$env/dynamic/public'

  import './image.css'

  let {
    image,
  } = $props()

  let height = $derived(image.pixelWidth > image.pixelHeight ? 720 : 1280)
</script>

<div class="asset-image">
  <a href={env.PUBLIC_SQUIDEX_ENVIRONMENT + env.PUBLIC_SQUIDEX_ASSETS + image?.slug} target="_blank">
    <img 
      class="image-element"
      alt="{image?.metadata?.description}"
      src={env.PUBLIC_SQUIDEX_ENVIRONMENT + env.PUBLIC_SQUIDEX_ASSETS + image?.slug + '?height=' + height}
      />
  </a>
</div>
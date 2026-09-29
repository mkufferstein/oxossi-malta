<script lang="ts">
  import { browser } from '$app/environment'

  import './map.css'

  let element : HTMLElement | undefined

  const {
    id = 'map-' + Math.random().toString(36).substring(2, 6),
    lat = 0,
    lng = 0,
    zoom = 10,
    title = '',
  } = $props()

  let center = $derived({lat, lng})

  $effect(() => {
    if (!browser
      || !element) {
      return
    }
    init()
  })


  async function init(): Promise<void> {
    if (!browser) {
      return
    }
    const [{ AdvancedMarkerElement }] = await Promise.all([
        google.maps.importLibrary('marker'),
        google.maps.importLibrary('maps'),
    ])

    // Get the inner map.
    const innerMap = element.innerMap

    // Set map options.
    innerMap.setOptions({
        mapTypeControl: false,
    })

    // Add a marker positioned at the map center (Uluru).
    new AdvancedMarkerElement({
        map: innerMap,
        position: center,
        title,
    })
  }
</script>
<gmp-map {center}
  map-id={id}
  bind:this={element}
  {zoom} ></gmp-map>
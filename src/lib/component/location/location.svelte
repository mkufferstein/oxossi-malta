<script lang="ts">
  import {
    locale,
  } from '$lib/locale/index.js'

  import Map from '../map/map.svelte'

  import './location.css'

  let {
    location,
  } = $props()

  const address = location?.data?.address?.[locale.get()],
    city = location?.data?.city?.[locale.get()],
    country = location?.data?.country?.[locale.get()],
    lat = location?.data?.location?.iv?.latitude,
    lng = location?.data?.location?.iv?.longitude,
    name = location?.data?.name?.[locale.get()]

</script>
<div class="locationContainer">
  <h2>{name}</h2>
  {@html address}
  <h3>{city}</h3>
  <p>{country}</p>
  <Map id={`capoeira-malta-${name}`}
    {lat}
    {lng}
    zoom={16} />
</div>

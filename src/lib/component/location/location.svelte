<script lang="ts">
  import Map from '../map/map.svelte'

  import './location.css'

  let {
    location,
  } = $props()

console.log('LLCOCOL', location)

  const address = location?.data?.address?.iv,
    lat = location?.data?.location?.iv?.latitude,
    lng = location?.data?.location?.iv?.longitude,
    name = location?.data?.name?.iv

</script>
<div class="locationContainer">
  <h2>{name}</h2>
  {@html address}
  <Map id={`capoeira-malta-${name}`}
    {lat}
    {lng}
    zoom={16} />
</div>

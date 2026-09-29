<script lang="ts">
  import {
    modal,
  } from '$lib/modal/index.js'

  import Location from '../location/location.svelte'

  import type {
    DayCard,
  } from './types'

  const {
    day,
    trainings,
  } : DayCard = $props()

  const showLocationModal = (e: Event) => {
    const target = e.currentTarget as HTMLElement
    const key = target.dataset.key
    modal.component = Location
    modal.properties = {location: trainings[key]?.location}
  }

</script>

<div class="dayCard">
  <h2>{day}</h2>
  {#each trainings as training, index}
    <div class="trainingSession">
      <span class="trainingType {training.type?.toLowerCase()}">{training.type}</span>
      <span class="trainingTime">{training.time}</span>
      <div 
        class="trainigLocation"
        data-key={index}
        onclick={showLocationModal}
        onkeyup={showLocationModal}
        role="button"
        tabindex="0"
        >{training.location?.data?.name?.iv}</div>
      {#if training?.title}
        <p class="trainigTitle">{training?.title}</p>
      {/if}
      {#if training?.description}
        <p class="trainigDescription">{training?.description}</p>
      {/if}
    </div>
  {/each}
</div>
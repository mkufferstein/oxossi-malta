<script lang="ts">
  import {
    modal,
  } from '$lib/modal/index.js'

  import Location from '../location/location.svelte'

  import type {
    DayCard,
  } from './types'

  const formatter = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' })

  const {
    day,
    trainings,
    notices,
  } : DayCard = $props()

  const showLocationModal = (e: Event) => {
    const target = e.currentTarget as HTMLElement
    const key = target.dataset.key
    modal.component = Location
    modal.properties = {location: trainings[key]?.location}
  }

  // $inspect(trainings)

</script>

<div class="dayCard">
  <h2>{day}</h2>
  {#if notices && notices.length > 0}
    <div class="notices-container">
      {#each notices as notice}
        <div class="notice">
          <span class="notice-text">{notice?.data?.text?.iv}</span>
        </div>
      {/each}
    </div>
  {/if}
  {#each trainings as training, index}
    <div class="trainingSession"
      class:changed={training.isChanged}
      class:cancelled={training.isCancelled} >
      {#if training?.date}
        <span class="trainingDate">{formatter.format(training?.date)}</span>
      {/if}
      {#if training?.title}
        <span class="trainingTitle">{training?.title}</span>
      {/if}
      <span class="trainingType {training.type?.toLowerCase()}">{training.type}</span>
      <span class="trainingTime">{training.time}</span>
      <div 
        class="trainingLocation"
        data-key={index}
        onclick={showLocationModal}
        onkeyup={showLocationModal}
        role="button"
        tabindex="0"
        >{training.location?.data?.name?.iv}</div>
      {#if training?.description}
        <p class="trainingDescription">{training?.description}</p>
      {/if}
    </div>
  {/each}
</div>
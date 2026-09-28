<script module lang="ts">
  import type {
    DayCard,
  } from './types'

  export {
    dayCard
  }
</script>

{#snippet dayCard(data: DayCard)}
  <div class="dayCard">
    <h2>{data.day}</h2>
    {#each data?.trainings as training}
      <div class="trainingSession">
        <span class="trainingType {training.type?.toLowerCase()}">{training.type}</span>
        <span class="trainingTime">{training.time}</span>
        <p class="trainigLocation">{training.location}</p>
        {#if training?.title}
          <p class="trainigTitle">{training?.title}</p>
        {/if}
        {#if training?.description}
          <p class="trainigDescription">{training?.description}</p>
        {/if}
      </div>
    {/each}
  </div>
{/snippet}
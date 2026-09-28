<script lang="ts">
  import './training.css'

  import {
    dayCard,
  } from './day-card.svelte'

  const {
    locationData,
    training,
    typeData,
  } = $props()

  const types = ['b129007a-10fe-43aa-9247-bea2b6058dd2', '001b0b32-24c3-4ad3-aca4-f196cfe1e7e0']
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday']

  let locationsMapped = {},
    byDay: {[key: string] : []} = {},
    typesMapped = {}

  typeData.map(currentType => {
    const id = currentType?.id
    typesMapped[id] = currentType
  })

  locationData.map(currentLocation => {
    const id = currentLocation?.id
    locationsMapped[id] = currentLocation
  })

  training.map(currentTraining =>  {
    const day = currentTraining?.data?.repeatsOn?.iv
    const location = currentTraining?.data?.location?.iv
    const type = currentTraining?.data?.type?.iv

    const trainigData : {} = {
      location: locationsMapped[location]?.data?.name?.iv,
      startOrder: 1500,
      time: `${currentTraining?.data?.startTime?.iv} - ${currentTraining?.data?.endTime?.iv}`,
      type: typesMapped[type]?.data?.title?.en,
      typeDescription: typesMapped[type]?.data?.description?.en
    }

    const [h, m, ap] = currentTraining?.data?.startTime?.iv?.split(/[.\s:]/i)
    if (ap 
      && ['am', 'pm'].indexOf(ap.toLowerCase()) > -1) {
      let hour: number = +h % 12
      hour += (ap.toLowerCase() === 'pm')
        ? 12
        : 0
      trainigData.startOrder = hour * 60 + +m
    } else {
      trainigData.startOrder = +h * 60 + +m
    }

    if (!byDay[day]) {
      byDay[day] = []
    }
    byDay[day].push(trainigData)

    byDay[day].sort((a, b) => a.startOrder - b.startOrder)
  })


console.log(byDay, locationsMapped)

</script>
<div class="trainingContainer">
  {#each days as day}
    {#if byDay[day]}
      {@render dayCard({
        day,
        trainings: byDay[day]
      })}
    {/if}
  {/each}
  <!-- {#each types as type}
    <div class="trainingType">
      <h3>
        {typesMapped[type]?.data?.title?.en}
      </h3>
      <p>
        {@html typesMapped[type]?.data?.description?.en}
      </p>
    </div>
    {#each days as day}
      <div class="training">
        <p>
          {repeatedTraining[type][day]?.data?.startTime?.iv} - {repeatedTraining[type][day]?.data?.endTime?.iv}
        </p>
        <p>
          {locationsMapped?.[repeatedTraining[type][day]?.data?.location?.iv]?.data?.name?.iv}
        </p>
      </div>
    {/each}
  {/each} -->
</div>
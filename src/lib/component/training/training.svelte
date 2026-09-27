<script lang="ts">
  import './training.css'

  const {
    locationData,
    training,
    typeData,
  } = $props()

  const types = ['b129007a-10fe-43aa-9247-bea2b6058dd2', '001b0b32-24c3-4ad3-aca4-f196cfe1e7e0']
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday']

  let locationsMapped = {},
    repeatedTraining: {[key: string] : {}} = {},
    typesMapped = {}

  training.map(currentTraining =>  {
    const type = currentTraining?.data?.type?.iv?.[0]
    const day = currentTraining?.data?.repeatsOn?.iv
    if (!repeatedTraining[type]) {
      repeatedTraining[type] = {}
    }
    repeatedTraining[type][day] = currentTraining
  })

  typeData.map(currentType => {
    const id = currentType?.id
    typesMapped[id] = currentType
  })

  locationData.map(currentLocation => {
    const id = currentLocation?.id
    locationsMapped[id] = currentLocation
  })

console.log(repeatedTraining, locationsMapped)

</script>
<div class="trainingContainer">
    <div class="day">
    </div>
  {#each days as day}
    <h3 class="day">
      {day}
    </h3>
  {/each}
  {#each types as type}
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
  {/each}
</div>
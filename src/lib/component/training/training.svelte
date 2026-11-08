<script lang="ts">
  import './training.css'

  import DayCard from './day-card.svelte'

  import type {
    LocationRawData,
    NoticeRawData,
    Training,
    TrainingRawData,
    TypeRawData,
  } from './types.js'

  const {
    locationData,
    noticeData,
    training,
    typeData,
  } = $props()

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


  const processTrainings = (aggregator: {[key: string] : Training[]}, currentTraining: TrainingRawData) =>  {
    const currentDate = new Date()
    const sevenDaysFromNow = new Date()
    sevenDaysFromNow.setDate(currentDate.getDate() + 7)

    // Handle potential undefined values
    const dateValue = currentTraining?.data?.date?.iv;
    const repeatsOnValue = currentTraining?.data?.repeatsOn?.iv;
    const locationValue = currentTraining?.data?.location?.iv;
    const typeValue = currentTraining?.data?.type?.iv;
    const startTimeValue = currentTraining?.data?.startTime?.iv;
    const endTimeValue = currentTraining?.data?.endTime?.iv;
    const titleValue = currentTraining?.data?.title?.iv;
    
    // Ensure dateValue is valid before creating Date object
    let day = '';
    if (repeatsOnValue) {
      day = repeatsOnValue;
    } else if (dateValue) {
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        day = days[(date.getDay() + 6) % 7];
      } else {
        day = 'Incorrect'
      }
    } else {
      day = 'Incorrect'
    }
    
    const location = locationValue;
    const type = typeValue;

    const trainingData: Training = {
      date: !repeatsOnValue && dateValue && new Date(dateValue) || undefined,
      id: currentTraining?.id,
      location: locationsMapped[location],
      startOrder: 1500,
      time: `${startTimeValue} - ${endTimeValue}`,
      title: !repeatsOnValue && titleValue || undefined,
      type: typesMapped[type]?.data?.title?.en,
      typeDescription: typesMapped[type]?.data?.description?.en
    }

    trainingNotices?.[trainingData.id]?.map((traningNotice: NoticeRawData) => {
      const validFrom = new Date(traningNotice?.data?.validFrom?.iv ?? ''),
        validUntil = new Date(traningNotice?.data?.validUntil?.iv ?? '')
      if (validFrom >= currentDate && validUntil <= sevenDaysFromNow) {
        if (traningNotice.data.newLocation?.iv) {
          trainingData.location = locationsMapped[traningNotice.data.newLocation.iv]
        }
        if (traningNotice.data.newStartTime?.iv) {
          trainingData.time = `${traningNotice.data.newStartTime.iv} - ${trainingData.time.split(' - ')[1]}`
        }
        if (traningNotice.data.newEndTime?.iv) {
          trainingData.time = `${trainingData.time.split(' - ')[0]} - ${traningNotice.data.newEndTime.iv}`
        }
        if (traningNotice.data.isCancelled?.iv) {
          trainingData.isCancelled = true;
        }
        trainingData.isChanged = true;
        
      } else {

      }
      console.log('procsessing ' + trainingData.id, traningNotice, validFrom, validUntil)
    })

    // // Process notices for this training
    // const noticesForTraining = trainingNotices?.[trainingData.id] || [];
    // if (noticesForTraining.length > 0) {
      
    //     // Find notices that have changes (newStartLocation, newStartTime, newEndTime)
    //     const changeNotices = noticesForTraining.filter(notice => 
    //       notice.data.newStartLocation?.iv || 
    //       notice.data.newStartTime?.iv || 
    //       notice.data.newEndTime?.iv
    //     );
        
    //     if (changeNotices.length > 0) {
    //       // Apply the first change notice (or handle multiple if needed)
    //       const changeNotice = changeNotices[0];
    //     }
    //   }
    // }


    // Handle time parsing safely
    const timeParts = startTimeValue?.split(/[.\s:]/i);
    if (timeParts && timeParts.length >= 2) {
      const [h, m, ap] = timeParts;
      if (ap 
        && ['am', 'pm'].indexOf(ap.toLowerCase()) > -1) {
        let hour: number = +h % 12;
        hour += (ap.toLowerCase() === 'pm')
          ? 12
          : 0;
        (trainingData as any).startOrder = hour * 60 + +m;
      } else {
        (trainingData as any).startOrder = +h * 60 + +m;
      }
    }

    if (!aggregator[day]) {
      aggregator[day] = []
    }
    aggregator[day].push(trainingData)

    aggregator[day].sort((a, b) => (a as any).startOrder - (b as any).startOrder)

    return aggregator
  }

  // Process notices to match them with training days
  const processTrainingNotices = (aggregator: {[key: string] : NoticeRawData[]}, currentNotice: NoticeRawData) => {
    if (currentNotice?.data?.trainings?.iv && currentNotice?.data?.trainings?.iv.length > 0) {
      currentNotice.data.trainings.iv.map(traniningImpacted => {
        if (!aggregator[traniningImpacted]) {
          aggregator[traniningImpacted] = []
        }
        aggregator[traniningImpacted].push(currentNotice)
      })
    }
    
    return aggregator;
  }

  const processNotices = (): { [key: string]: NoticeRawData[] } => {
    if (!noticeData) return {};
    
    const noticesByDay: { [key: string]: NoticeRawData[] } = {}
    
    noticeData.forEach((notice: NoticeRawData) => {
      if (!notice?.data?.validFrom?.iv || !notice?.data?.validUntil?.iv) {
        return
      }
      
      
      if (notice?.data?.trainings?.iv && notice?.data?.trainings?.iv.length > 0) {


      // } else {
      //     const validFrom = new Date(notice.data.validFrom.iv)
      //     const validUntil = new Date(notice.data.validUntil.iv)
      //   const currentDate = new Date(validFrom);
      //   while (currentDate <= validUntil) {
      //     const dayIndex = (currentDate.getDay() + 6) % 7;
      //     const dayName = days[dayIndex];
          
      //     if (!noticesByDay[dayName]) {
      //       noticesByDay[dayName] = [];
      //     }
          
      //     noticesByDay[dayName].push(notice);
      //     currentDate.setDate(currentDate.getDate() + 1);
      //   }
      }
    })
    
    return noticesByDay;
  }

 const processLocations = (aggregator: {[key: string] : LocationRawData}, currentLocation: LocationRawData) => {
    const id = currentLocation?.id
    aggregator[id] = currentLocation
    return aggregator
  }

 const processTypes = (aggregator: {[key: string] : TypeRawData}, currentType: TypeRawData) => {
    const id = currentType?.id
    aggregator[id] = currentType
    return aggregator
  }

  let trainingNotices: { [key: string]: NoticeRawData[] } = $derived(noticeData.reduce(processTrainingNotices, {})),
    locationsMapped: { [key: string]: LocationRawData } = $derived(locationData.reduce(processLocations,{})),
    typesMapped: { [key: string]: TypeRawData } = $derived(typeData.reduce(processTypes, {}))

  let byDay: { [key: string]: Training[] } = $derived(training.reduce(processTrainings, {})),
    noticesMapped = $derived(processNotices())

  $inspect('BD', byDay)
  $inspect('TN', trainingNotices)
  $inspect('NM', noticesMapped)
</script>
<div class="trainingContainer">
  {#each days as day}
    {#if byDay[day]}
      <DayCard {day} trainings={byDay[day]} notices={noticesMapped?.[day]} />
    {/if}
  {/each}
</div>
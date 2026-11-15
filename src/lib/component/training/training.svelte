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
    trainingData,
    typeData,
  } = $props()

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  // Process locations into a map
  const processLocations = (aggregator: {[key: string] : LocationRawData}, currentLocation: LocationRawData) => {
    const id = currentLocation?.id
    aggregator[id] = currentLocation
    return aggregator
  }

  // Process types into a map
  const processTypes = (aggregator: {[key: string] : TypeRawData}, currentType: TypeRawData) => {
    const id = currentType?.id
    aggregator[id] = currentType
    return aggregator
  }

  // Process notices to match them with training days
  const processTrainingNotices = (aggregator: {[key: string] : NoticeRawData[]}, currentNotice: NoticeRawData) => {
    if (currentNotice?.data?.trainings?.iv && currentNotice?.data?.trainings?.iv.length > 0) {
      currentNotice.data.trainings.iv.forEach(trainingId => {
        if (!aggregator[trainingId]) {
          aggregator[trainingId] = []
        }
        aggregator[trainingId].push(currentNotice)
      })
    }
    
    return aggregator;
  }

  // Process notices to associate them with specific days based on date ranges
  const processNotices = (): { [key: string]: NoticeRawData[] } => {
    if (!noticeData) return {};
    
    const noticesByDay: { [key: string]: NoticeRawData[] } = {}
    
    noticeData.forEach((notice: NoticeRawData) => {
      if (!notice?.data?.validFrom?.iv || !notice?.data?.validUntil?.iv) {
        return
      }
      
      // If specific trainings are defined, use those
      if (notice?.data?.trainings?.iv && notice?.data?.trainings?.iv.length > 0) {
        notice.data.trainings.iv.forEach(trainingId => {
          if (!noticesByDay[trainingId]) {
            noticesByDay[trainingId] = [];
          }
          noticesByDay[trainingId].push(notice);
        });
      } else {
        // If no specific trainings, apply to all days within the date range
        const validFrom = new Date(notice.data.validFrom.iv)
        const validUntil = new Date(notice.data.validUntil.iv)
        const currentDate = new Date(validFrom);
        
        while (currentDate <= validUntil) {
          const dayIndex = (currentDate.getDay() + 6) % 7;
          const dayName = days[dayIndex];
          
          if (!noticesByDay[dayName]) {
            noticesByDay[dayName] = [];
          }
          
          noticesByDay[dayName].push(notice);
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    })
    
    return noticesByDay;
  }

  // Check if a notice is valid for a specific date
  const isNoticeValidForDate = (notice: NoticeRawData, date: Date): boolean => {
    if (!notice?.data?.validFrom?.iv || !notice?.data?.validUntil?.iv) {
      return false;
    }
    
    const validFrom = new Date(notice.data.validFrom.iv);
    const validUntil = new Date(notice.data.validUntil.iv);
    
    return date >= validFrom && date <= validUntil;
  }

  // Process training data to associate with days and notices
  const processTrainings = (aggregator: {[key: string] : Training[]}, currentTraining: TrainingRawData) =>  {
    const currentDate = new Date()
    const sevenDaysFromNow = new Date()
    sevenDaysFromNow.setDate(currentDate.getDate() + 7)

    // Handle potential undefined values
    const dateValue = currentTraining?.data?.date?.iv,
      repeatsOnValue = currentTraining?.data?.repeatsOn?.iv,
      locationValue : string = currentTraining?.data?.location?.iv?.[0] ?? '',
      typeValue = currentTraining?.data?.type?.iv,
      startTimeValue = currentTraining?.data?.startTime?.iv,
      endTimeValue = currentTraining?.data?.endTime?.iv,
      titleValue = currentTraining?.data?.title?.iv
    
    // Ensure dateValue is valid before creating Date object
    let day = '';
    let trainingDate: Date | undefined = undefined;
    
    if (repeatsOnValue) {
      day = repeatsOnValue;
    } else if (dateValue) {
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        day = days[(date.getDay() + 6) % 7];
        trainingDate = date;
      } else {
        day = 'Incorrect'
      }
    } else {
      day = 'Incorrect'
    }
    
    const typeName = typeValue ? typesMapped[typeValue]?.data?.title?.en : undefined,
      typeDescription = typeValue ? typesMapped[typeValue]?.data?.description?.en : undefined
    
    const currentTrainingData: Training = {
      date: trainingDate,
      id: currentTraining?.id,
      location: locationsMapped[locationValue],
      startOrder: 1500,
      time: `${startTimeValue} - ${endTimeValue}`,
      title: !repeatsOnValue && titleValue || undefined,
      type: typeName || '',
      typeDescription: typeDescription
    }

    // Process notices for this training
    const noticesForTraining = trainingNotices?.[trainingData.id] || [];
    
    // Apply notices that are valid for this training date
    const validNotices = noticesForTraining.filter(notice => {
      if (trainingDate) {
        return isNoticeValidForDate(notice, trainingDate);
      }
      return false;
    });
    
    if (validNotices.length > 0) {
      // Apply changes from notices to training data
      validNotices.forEach(notice => {
        // Check if the notice has changes (newStartLocation, newStartTime, newEndTime)
        if (notice.data.newLocation?.iv || 
            notice.data.newStartTime?.iv || 
            notice.data.newEndTime?.iv ||
            notice.data.isCancelled?.iv) {
          
          if (notice.data.newLocation?.iv) {
            currentTrainingData.location = locationsMapped[Number(notice.data.newLocation?.iv)]
          }
          if (notice.data.newStartTime?.iv) {
            currentTrainingData.time = `${notice.data.newStartTime.iv} - ${trainingData.time.split(' - ')[1]}`
          }
          if (notice.data.newEndTime?.iv) {
            currentTrainingData.time = `${trainingData.time.split(' - ')[0]} - ${notice.data.newEndTime.iv}`
          }
          if (notice.data.isCancelled?.iv) {
            currentTrainingData.isCancelled = true;
          }
          currentTrainingData.isChanged = true;
        }
      });
    }

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
        (currentTrainingData as any).startOrder = hour * 60 + +m;
      } else {
        (currentTrainingData as any).startOrder = +h * 60 + +m;
      }
    }

    if (!aggregator[day]) {
      aggregator[day] = []
    }
    aggregator[day].push(currentTrainingData)

    aggregator[day].sort((a, b) => (a as any).startOrder - (b as any).startOrder)

    return aggregator
  }

  let trainingNotices: { [key: string]: NoticeRawData[] } = $derived(noticeData.reduce(processTrainingNotices, {})),
    locationsMapped: { [key: string]: LocationRawData } = $derived(locationData.reduce(processLocations,{})),
    typesMapped: { [key: string]: TypeRawData } = $derived(typeData.reduce(processTypes, {}))

  let byDay: { [key: string]: Training[] } = $derived(trainingData.reduce(processTrainings, {})),
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
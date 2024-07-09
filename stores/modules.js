export const useModulesStore = defineStore('modules', () => {
    // Reactive state
    const title = ref('Contemporary Issues In Cyber Security')
    const weeks = ref([])
    const startDate = ref(new Date())
    const key = ref('')
  
    function updateWeeks(newWeeks) {
      weeks.value = newWeeks
    }
  
    // Learning outcomes and assessments
    const learningOutcomes = ref([
      {
        label: 'Formulate a plan to synthesise academic sources and relevant cultural texts.',
        value: 'outcome1'
      },
      {
        label: 'Synthesise literature about food and culture from a range of relevant sources.',
        value: 'outcome2'
      },
      {
        label: 'Critically analyse specific examples to evaluate more general arguments about food.',
        value: 'outcome3'
      },
      {
        label:
          'Critically assess the relationship(s) between food and other facets of contemporary society.',
        value: 'outcome4'
      }
    ])
  
    const assessments = ref([
      { label: 'Assessment 1', value: 'assessment1', nickname: '' },
      { label: 'Assessment 2', value: 'assessment2', nickname: '' },
      { label: 'Assessment 3', value: 'assessment3', nickname: '' }
    ])
  
    const moodleActivities = ref([
      { name: 'Book', value: 'book', image: '#' },
      { name: 'Quiz', value: 'quiz', image: '#' },
      { name: 'Wiseflow', value: 'wiseflow', image: '#' },
      { name: 'Chat', value: 'chat', image: '#' },
      { name: 'Forum', value: 'forum', image: '#' },
      { name: 'Lesson', value: 'lesson', image: '#' },
      { name: 'Choice', value: 'choice', image: '#' },
      { name: 'Database', value: 'database', image: '#' },
      { name: 'Feedback', value: 'feedback', image: '#' },
      { name: 'Glossary', value: 'glossary', image: '#' },
      { name: 'Wiki', value: 'wiki', image: '#' },
      { name: 'Workshop', value: 'workshop', image: '#' },
      { name: 'Reading List', value: 'reading-list', image: '#' }
    ])
  
    // Alignment options combining learning outcomes and assessments
    const alignmentOptions = computed(() => [
      { group: 'Learning Outcomes', items: learningOutcomes.value },
      { group: 'Assessments', items: assessments.value }
    ])
  
    // Activity types with their corresponding colors
    const activityTypesColors = ref([
      { type: 'Acquisition', color: '#da3732' },
      { type: 'Collaboration', color: '#e1903e' },
      { type: 'Discussion', color: '#e3b645' },
      { type: 'Investigation', color: '#b5cb53' },
      { type: 'Practice', color: '#3173b6' },
      { type: 'Production', color: '#2b3a8b' }
    ])

    // Define your activityColors array
const graphColors = [
  '#4CAF50', // Green
  '#2196F3', // Blue
  '#FF5722', // Deep Orange
  '#673AB7', // Deep Purple
  '#FFC107', // Amber
  '#9C27B0', // Purple
  '#3F51B5', // Indigo
  '#E91E63', // Pink
  '#FF9800', // Orange
  '#795548', // Brown
  '#607D8B', // Blue Grey
  '#009688', // Teal
  '#FFEB3B', // Yellow
  '#8BC34A', // Light Green
  '#03A9F4', // Light Blue
  '#FF5252', // Red
  '#CDDC39', // Lime
  '#FF4081', // Pink Red
  '#00BCD4', // Cyan
  '#9E9E9E', // Grey
  '#F44336', // Dark Red
  '#673AB7', // Dark Purple (duplicate)
  '#4CAF50', // Dark Green (duplicate)
  '#2196F3', // Dark Blue (duplicate)
  '#FFC107', // Dark Amber (duplicate)
  '#9C27B0', // Dark Purple (duplicate)
  '#3F51B5', // Dark Indigo (duplicate)
  '#E91E63', // Dark Pink (duplicate)
  '#FF9800', // Dark Orange (duplicate)
  '#795548', // Dark Brown (duplicate)
  '#607D8B' // Dark Blue Grey (duplicate)
]
  
    // get the colour of the activity type by it's label
    const getColorByLabel = (type) => {
      const activityType = activityTypesColors.value.find((activity) => activity.type === type)
      return activityType ? activityType.color : null
    }
  
    const activityTypes = computed(() => activityTypesColors.value.map((activity) => activity.type))
  
    const activityColors = computed(() => activityTypesColors.value.map((activity) => activity.color))
  
    // Compute slug dynamically from title
    const slug = computed(() => slugify(title.value))
  
    // Get the count of weeks as a computed property
    const numberOfWeeks = computed(() => weeks.value.length)
  
    // Compute the total number of activities in the course
    const totalActivities = computed(() => {
      let count = 0
      for (const week of weeks.value) {
        count += week.activities.length
      }
      return count
    })
  
    // Get an array of all the names of the weeks
    const weekNames = computed(() => weeks.value.map((week) => week.name))
  
    // Get the number of activities each week in an array
    const activitiesPerWeek = computed(() => weeks.value.map((week) => week.activities.length))
  
    // Compute the largest number of minutes in any activity
    const maxMinsInActivity = computed(() => {
      let maxMins = 0
      for (const week of weeks.value) {
        for (const activity of week.activities) {
          if (activity.minutes > maxMins) {
            maxMins = activity.minutes
          }
        }
      }
      return maxMins
    })
  
    // Function to compute the total number of minutes for a specific week
    const totalMinsInWeekActivities = (weekIndex) => {
      const week = weeks.value[weekIndex]
  
      if (!week || !Array.isArray(week.activities)) {
        return 0
      }
  
      return week.activities.reduce((total, activity) => {
        const minutes = activity.duration
        return total + (typeof minutes === 'number' && !isNaN(minutes) ? minutes : 0)
      }, 0)
    }
  
    const getActivityColor = () => {
      const randomIndex = Math.floor(Math.random() * graphColors.length)
      return graphColors[randomIndex]
    }
  
    const getActivitiesForWeek = (weekIndex) => {
      const week = weeks.value[weekIndex]
  
      if (!week || !Array.isArray(week.activities)) {
        return []
      }
  
      return week.activities.map((activity) => ({
        label: activity.title,
        value: activity.duration,
        color: activity.color
      }))
    }
  
    const activityTypeCount = computed(() => {
      const activityTypeCounts = {}
  
      // Initialize counts for each activity type to 0
      for (const type of activityTypes.value) {
        activityTypeCounts[type] = 0
      }
  
      // Count the occurrences of each activity type
      for (const week of weeks.value) {
        for (const activity of week.activities) {
          // Check if selectedTypes is defined
          if (activity.selectedTypes) {
            for (const type of activity.selectedTypes) {
              if (activityTypeCounts[type] !== undefined) {
                activityTypeCounts[type]++
              }
            }
          }
        }
      }
  
      // Return the counts of each activity type as an array
      const countsArray = activityTypes.value.map((type) => {
        return activityTypeCounts[type] || 0
      })
  
      return countsArray
    })
  
    const activityTypePercentages = computed(() => {
      const activityTypeCounts = {}
  
      // Initialize counts for each activity type to 0
      for (const type of activityTypes.value) {
        activityTypeCounts[type] = 0
      }
  
      // Count the occurrences of each activity type
      for (const week of weeks.value) {
        for (const activity of week.activities) {
          // Check if selectedTypes is defined
          if (activity.selectedTypes) {
            for (const type of activity.selectedTypes) {
              if (activityTypeCounts[type] !== undefined) {
                activityTypeCounts[type]++
              }
            }
          }
        }
      }
  
      // Calculate the total number of activities considering multiple types per activity
      const totalTypeOccurrences = Object.values(activityTypeCounts).reduce(
        (sum, count) => sum + count,
        0
      )
  
      // Calculate the percentage of each activity type
      const percentages = activityTypes.value.map((type) => {
        const count = activityTypeCounts[type] || 0
        const percentage = (count / totalTypeOccurrences) * 100 || 0
        return Number(percentage.toFixed(2))
      })
  
      return percentages
    })
  
    const activityTypePercentagesPerWeek = computed(() => {
      const percentagesPerWeek = weeks.value.map((week) => {
        const activityTypeCounts = {}
        // Initialize counts for each activity type to 0
        for (const type of activityTypes.value) {
          activityTypeCounts[type] = 0
        }
        // Count the occurrences of each activity type in the current week
        for (const activity of week.activities) {
          // Check if selectedTypes is defined
          if (activity.selectedTypes) {
            for (const type of activityTypes.value) {
              if (activity.selectedTypes.includes(type)) {
                activityTypeCounts[type]++
              }
            }
          }
        }
        // Calculate the total number of activities considering multiple types per activity
        const totalTypeOccurrences = Object.values(activityTypeCounts).reduce(
          (sum, count) => sum + count,
          0
        )
        // Calculate the percentage of each activity type for the current week
        const percentages = activityTypes.value.map((type) => {
          const count = activityTypeCounts[type] || 0
          const percentage = (count / totalTypeOccurrences) * 100 || 0
          return Number(percentage.toFixed(2))
        })
        return percentages
      })
      return percentagesPerWeek
    })
  
    const getActivityTypePercentagesForWeek = (weekIndex) => {
      if (weekIndex >= 0 && weekIndex < weeks.value.length) {
        const week = weeks.value[weekIndex]
        const activityTypeCounts = {}
  
        // Initialize counts for each activity type to 0
        for (const type of activityTypes.value) {
          activityTypeCounts[type] = 0
        }
  
        // Count the occurrences of each activity type in the specified week
        for (const activity of week.activities) {
          // Check if selectedTypes is defined
          if (activity.selectedTypes) {
            for (const type of activityTypes.value) {
              if (activity.selectedTypes.includes(type)) {
                activityTypeCounts[type]++
              }
            }
          }
        }
  
        // Calculate the total number of activities considering multiple types per activity
        const totalTypeOccurrences = Object.values(activityTypeCounts).reduce(
          (sum, count) => sum + count,
          0
        )
  
        // Calculate the percentage of each activity type for the specified week
        const percentages = activityTypes.value.map((type) => {
          const count = activityTypeCounts[type] || 0
          const percentage = (count / totalTypeOccurrences) * 100 || 0
          return Number(percentage.toFixed(2))
        })
        return percentages
      } else {
        return []
      }
    }
  
    const activityTypeColorAndCount = computed(() => {
      const activityTypeCounts = {}
      const activityTypeColors = {}
  
      // Initialize counts and colors for each activity type
      for (const activityType of activityTypesColors.value) {
        activityTypeCounts[activityType.type] = 0
        activityTypeColors[activityType.type] = activityType.color
      }
  
      // Count the occurrences of each activity type
      for (const week of weeks.value) {
        for (const activity of week.activities) {
          if (activity.selectedTypes) {
            for (const type of activity.selectedTypes) {
              if (activityTypeCounts[type] !== undefined) {
                activityTypeCounts[type]++
              }
            }
          }
        }
      }
  
      // Calculate total activities for percentage calculation
      const totalActivities = Object.values(activityTypeCounts).reduce((sum, count) => sum + count, 0)
  
      // Create an array with each activity type, its color, count, and percentage
      return Object.keys(activityTypeCounts).map((type) => {
        const count = activityTypeCounts[type]
        const percentage = totalActivities > 0 ? (count / totalActivities) * 100 : 0
        return {
          type,
          color: activityTypeColors[type],
          count,
          percentage: percentage.toFixed(0)
        }
      })
    })
  
    // Store actions
    const incrementWeek = (name, description, activities) => {
      let tempName = ''
  
      if (weeks.value && weeks.value.length >= 0) {
        tempName = 'New Week ' + (weeks.value.length + 1)
      } else {
        tempName = 'New Week'
      }
      const tempDescription = ''
      const tempActivities = []
  
      const newWeek = new Week(tempName, startDate, tempDescription, tempActivities)
      weeks.value.push(newWeek)
    }

    const duplicateWeek = (week) => {
        const newWeek = JSON.parse(JSON.stringify(week)); // Deep copy using JSON methods
        newWeek.name = 'Copy of ' + newWeek.name;
        weeks.value.push(newWeek);
      };
  
    const addWeek = (week) => {
      weeks.value.push(week)
    }

    const addActivity = (weekIndex) => {
        const newActivity = new Activity();
        newActivity.duration = 0;
      
        if (weeks.value[weekIndex].activities.length >= 0) {
          newActivity.name = 'New Activity ' + (weeks.value[weekIndex].activities.length + 1);
        }
        weeks.value[weekIndex].activities.push(newActivity);
      };

      const getWeek = (index) => {
        return weeks.value[index]
      }
  
    return {
      title,
      startDate,
      slug,
      weeks,
      alignmentOptions,
      learningOutcomes,
      assessments,
      activityTypes,
      activityColors,
      activityTypesColors,
      numberOfWeeks,
      totalActivities,
      weekNames,
      activitiesPerWeek,
      activityTypePercentagesPerWeek,
      activityTypePercentages,
      maxMinsInActivity,
      totalMinsInWeekActivities,
      getActivityTypePercentagesForWeek,
      getColorByLabel,
      activityTypeCount,
      incrementWeek,
      addWeek,
      moodleActivities,
      updateWeeks,
      activityTypeColorAndCount,
      getActivitiesForWeek,
      getActivityColor,
      key,
      duplicateWeek,
      addActivity,
      getWeek
    }
  })
  


export default class Week {
  constructor(name, startDate, description, activities = []) {
    this.name = name
    this.startDate = new Date(startDate)
    this.description = description
    this.activities = activities
  }

  get date() {
    const module = useModuleStore()
    const index = computed(() => module.weeks.indexOf(this))
    if (index.value === -1) {
      return module.startDate // If not found, return the original startDate
    }
    const newDate = new Date(module.startDate)
    newDate.setDate(newDate.getDate() + index.value * 7)
    return newDate
  }

  get formattedDate() {
    return this.date.toLocaleDateString('en-GB') // Format the date as dd/mm/yyyy
  }
}

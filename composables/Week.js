
export default class Week {
  constructor(name, startDate, description, activities = []) {
    this.name = name;
    this.startDate = new Date(startDate);
    this.description = description;
    this.activities = activities;
    
    // Initialize reactive index property
    this.index = computed(() => {
      const module = useModulesStore();
      return module.weeks.indexOf(this);
    });
  }

  // Getter for date based on index
  get date() {
    const module = useModulesStore();
    const newIndex = this.index.value;

    if (newIndex === -1) {
      return module.startDate; // Default to startDate if not found
    }

    const newDate = new Date(module.startDate);
    newDate.setDate(newDate.getDate() + newIndex * 7); // Adjust date based on week index
    return newDate;
  }

  // Getter for formatted date
  get formattedDate() {
    return this.date.toLocaleDateString('en-GB'); // Format the date as dd/mm/yyyy
  }
}
export default class Week {
  constructor(name, startDate, description, activities = []) {
    this.name = name;
    this.description = description;
    this.activities = activities;

    // Initialize reactive index property
    this.index = computed(() => {
      const module = useModulesStore();
      return module.weeks.indexOf(this);
    });

    // Computed property for date based on index
    this.date = computed(() => {
      const module = useModulesStore();

      if (this.index.value === -1) {
        return module.startDate; // Default to startDate if not found
      }

      const newDate = new Date(module.startDate);
      newDate.setDate(newDate.getDate() + this.index.value * 7); // Adjust date based on week index
      return newDate;
    });

    // Computed property for formatted date
    this.formattedDate = computed(() => {
      return this.date.value.toLocaleDateString('en-GB'); // Format the date as dd/mm/yyyy
    });
  }
}
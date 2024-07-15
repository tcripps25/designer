

export default class Activity {
  constructor(
    title,
    instructions,
    duration,
    isGroup,
    mode,
    color,
    selectedTypes,
    selectedAlignments,
    selectedMoodle,
    parentWeek,
  ) {
    this.title = title
    this.instructions = instructions
    this.duration = duration
    this.isGroup = isGroup
    this.mode = mode
    this.color = this.getColor()
    this.selectedTypes = []
    this.selectedAlignments = []
    this.selectedMoodle = []
    this.parentWeek = parentWeek
  }

  getColor() {
    const module = useModulesStore()
    const color = module.getActivityColor()

    return color
  }
}

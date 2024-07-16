<script setup>

const props = defineProps({
  moodleActivity: Object,
  activity: Object
});

// Ensure selectedMoodle is reactive
if (!props.activity.selectedMoodle) {
  props.activity.selectedMoodle = ref([]);
}

const selected = computed({
  get() {
    return props.activity.selectedMoodle.includes(props.moodleActivity);
  },
  set(value) {
    if (value) {
      if (!props.activity.selectedMoodle.includes(props.moodleActivity)) {
        props.activity.selectedMoodle.push(props.moodleActivity);
      }
    } else {
      const index = props.activity.selectedMoodle.indexOf(props.moodleActivity);
      if (index !== -1) {
        props.activity.selectedMoodle.splice(index, 1);
      }
    }
  }
});

const toggleSelected = () => {
  selected.value = !selected.value;
};
</script>

<template>
  <UButton variant="ghost" @click="() => { $emit('selected'); toggleSelected(); }"
    class="hover:bg-slate-50 transition w-full bg-slate-100 dark:bg-zinc-900">
    <div
      class="flex gap-2 items-center justify-start text-sky-700 transition p-0 text-sm font-normal rounded whitespace-nowrap ">
      <Transition name="fade">
        <UIcon v-if="selected" name="i-heroicons-check-circle-solid"
          class="max-w-5 max-h-5 min-w-5 min-h-5 text-sky-600" />
        <div v-else class="w-5 h-5 bg-white dark:bg-black dark:border-black border-white rounded-full border"></div>
      </Transition>

      <span> {{ moodleActivity.name }}</span>
    </div>
  </UButton>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  position: absolute;
  transform: scale(.7);
}
</style>

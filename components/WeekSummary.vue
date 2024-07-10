<script setup>

const props = defineProps({
  week: Object,
  index: Number
});


const module = useModulesStore()

const editItems = ref([
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      navigateTo('/design/week-' + props.index)
    }
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid',
    click: () => {
      module.duplicateWeek(props.week);
    }
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {
      module.weeks.splice(props.index, 1);
    }
  }]
])
</script>

<template>
  <LayoutPanel :title="week.name" :to="'/design/week-' + index">
    <template v-slot:subtitle>
      <p>Week Commencing: {{ week.startDate }}</p>
    </template>
    <template v-slot:action>

      <UDropdown :items="editItems" :popper="{ placement: 'bottom-start' }">
        <UButton variant="ghost" trailing-icon="i-heroicons-ellipsis-vertical-solid" />
      </UDropdown>

    </template>
    <div class="flex items-center gap-5 divide-x bg-slate-100 dark:bg-zinc-800 rounded mb-5 p-2 text-sm">
      <div class="p-3 grow text-sky-800 dark:text-sky-200  flex flex-col justify-center items-center">

        <span class="font-semibold text-xl">{{ week.activities.length }}</span>
        <p class="font-medium">Activities</p>
      </div>
      <div class="p-3 grow text-orange-800 dark:text-orange-100  flex flex-col justify-center items-center">

        <p class="text-sm"><span class="font-semibold text-xl">{{ module.totalMinsInWeekActivities(index) }} </span>
          mins
        </p>
        <p class="font-medium">Teaching Time</p>
      </div>
    </div>
    <UFormGroup label="Description">
      <UTextarea v-model="week.description" />
    </UFormGroup>
  </LayoutPanel>
</template>

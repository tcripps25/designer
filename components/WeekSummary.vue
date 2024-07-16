<script setup>
import ConfirmDialog from '@/components/layout/ConfirmDialog.vue';
const props = defineProps({
  week: Object,
  index: Number
});


const module = useModulesStore()
const toast = useToast()
const modal = useModal()

function deleteModal() {
  // Compute the custom message based on the activities length
  let customMessage;
  if (props.week.activities.length > 0) {
    customMessage = 'You will not be able to recover this Week or the ' + props.week.activities.length + ' Activities it contains.';
  } else {
    customMessage = 'You will not be able to recover this Week.';
  }

  // Open the modal with the computed message
  modal.open(ConfirmDialog, {
    itemName: props.week.name,
    title: 'Delete ' + props.week.name + '?',
    message: customMessage,
    cancel: 'Back to Designer',
    confirm: 'Delete Week',
    onDelete() {
      module.deleteWeek(props.index);
      toast.add({
        title: 'Deleted: ' + props.week.name,
        id: 'modal-delete',
      });
      modal.close()
    },
  });
}


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
      toast.add({
        title: 'Duplicated:' + props.week.name,
        id: 'duplicate-week' + props.index + '-notice',
      });
    }
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {
      deleteModal()
    }
  }]
])
</script>

<template>
  <LayoutPanel :title="week.name" :to="'/design/week-' + index">
    <template v-slot:subtitle>
      <p>Week Commencing: {{ week.formattedDate }}</p>
    </template>
    <template v-slot:action>

      <UDropdown :items="editItems" :popper="{ placement: 'bottom-start' }">
        <UButton variant="ghost" trailing-icon="i-heroicons-ellipsis-vertical-solid" />
      </UDropdown>

    </template>
    <div class="flex flex-col gap-5">
      <UFormGroup label="Description">
        <UTextarea autoresize v-model="week.description" />
      </UFormGroup>
      <div
        class="flex items-center gap-5 divide-x dark:divide-zinc-800 bg-slate-100 dark:bg-zinc-900 rounded p-2 text-sm">
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
    </div>
  </LayoutPanel>
</template>

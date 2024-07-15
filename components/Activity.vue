<script setup>


import ConfirmDialog from '@/components/layout/ConfirmDialog.vue';


const props = defineProps({
  activity: Object,
  index: Number,
})
const module = useModulesStore()

const toast = useToast()
const modal = useModal()

function openModal() {

  modal.open(ConfirmDialog, {
    itemName: props.activity.title,
    title: ('Delete ' + props.activity.title) + '?',
    message: 'You will not be able to recover this Activity.',
    cancel: 'Back to Designer',
    confirm: 'Delete Activity',

    onDelete() {
      module.removeActivity(props.activity.parentWeek, props.index);
      toast.add({
        title: 'Activity Deleted: ' + props.activity.title,
        id: 'delete-activity' + props.index + '-notice',
      })
      modal.close()
    }
  })
}

const editItems = ref([
  [{
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid',
    click: () => {
      module.duplicateActivity(props.activity.parentWeek, props.activity);
      toast.add({
        title: 'Duplicated ' + props.activity.title,
        id: 'duplicate-activity' + props.index + '-notice',
      });
    }
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {
      openModal()
    }
  }]
])

const modeOptions = ref([
  'Sync', 'Async'
])

const editMode = ref(false);

const toggleEditMode = () => {
  editMode.value = !editMode.value;
}


const editTypes = ref(false);

const toggleEditTypes = () => {
  editTypes.value = !editTypes.value;
  editMode.value = !editMode.value;
}

const editAlign = ref(false);

const toggleEditAlign = () => {
  editAlign.value = !editAlign.value;
  editMode.value = !editMode.value;
}

const editInstructions = ref(false);

const toggleEditInstructions = () => {
  editInstructions.value = !editInstructions.value;
}

const editTitle = ref(false);

const toggleEditTitle = () => {
  editTitle.value = !editTitle.value;
}

const manageActivity = ref(false);

const togglemanageActivity = () => {
  manageActivity.value = !manageActivity.value;
  editMode.value = !editMode.value;
}

const suggestMoodle = ref(false);

const toggleSuggestMoodle = () => {
  suggestMoodle.value = !suggestMoodle.value;
  editMode.value = !editMode.value;
}

// Initialize an array to track the visibility of each group
const showAlignments = ref(module.alignmentOptions.map(() => true));

const toggleShowAlignments = (index) => {
  showAlignments.value[index] = !showAlignments.value[index];
};

const isAligned = (item) => {
  return computed({
    get: () => {
      // Check again within the getter in case of reactivity issues
      if (!props.activity.alignments) {
        props.activity.alignments = [];
      }
      return props.activity.selectedAlignments.some(alignment => alignment.value === item.value);
    },
    set: (newValue) => {
      if (!props.activity.selectedAlignments) {
        props.activity.selectedAlignments = [];
      }

      if (newValue) {
        if (!props.activity.selectedAlignments.some(alignment => alignment.value === item.value)) {
          props.activity.selectedAlignments.push(item);
        }
      } else {
        const index = props.activity.selectedAlignments.findIndex(alignment => alignment.value === item.value);
        if (index > -1) {
          props.activity.selectedAlignments.splice(index, 1);
        }
      }
    }
  });
};
</script>

<template>

  <article class="w-full max-w-md relative">
    <LayoutPanel activity :title="activity.title" tag="article" :id="'activity-' + index + '-container'"
      class="h-[32rem] shadow-sm rounded-lg mb-5 p-5 flex flex-col transition-all"
      :class="{ 'scale-95 !bg-slate-200 dark:!bg-zinc-900 -translate-x-5': editMode }">
      <template v-slot:action>
        <UDropdown :items="editItems" :popper="{ placement: 'bottom-start' }">
          <UButton variant="ghost" trailing-icon="i-heroicons-ellipsis-vertical-solid" />
        </UDropdown>
      </template>
      <div id="activity-content"
        class="flex flex-col gap-3 divide-y -mr-5 divide-slate-200 dark:divide-zinc-700 overflow-x-auto -mb-5 pb-5 pt-2 pl-1 -ml-1">
        <UFormGroup label="Instructions" class="pr-5">
          <UTextarea autoresize v-model="activity.instructions" />
        </UFormGroup>

        <UFormGroup label="Duration (mins)" class="flex items-center justify-between pr-5 pt-2">
          <UInput class="w-20" v-model="activity.duration" type="number" size="sm" />
        </UFormGroup>

        <UFormGroup label="Learning Mode" class="flex items-center justify-between pr-5 pt-2">
          <USelect v-model="activity.mode" :options="modeOptions" placeholder="Select mode" />
        </UFormGroup>
        <UFormGroup label="Group Activity" class="flex items-center justify-between pr-5 pt-2">
          <UToggle class="mt-1" v-model="activity.isGroup" size="md" />
        </UFormGroup>
        <div class="text-sm">
          <UFormGroup label="Learning Types" class="flex items-start justify-between pr-5 pt-2 mb-2">
            <template #help>
              <div class="flex items-center">
                <UButton @click="toggleEditTypes" class="w-max text-sky-800" label="About enABLe Learning Types"
                  title="About enABLe Learning Types" size="xs" variant="ghost">
                  About enABLe Learning Types
                  <UIcon name="i-heroicons-information-circle" />
                </UButton>

              </div>
            </template>

            <template #label>
              <span class="flex mt-1">Learning Types</span>

            </template>
            <USelectMenu v-model="activity.selectedTypes" :options="module.activityTypesColors" value-attribute="type"
              option-attribute="type" multiple placeholder="Select Learning Types" class="w-56" />
          </UFormGroup>
          <ul v-if="activity && activity.selectedTypes && activity.selectedTypes.length > 0"
            class="grid grid-cols-3 grid-flow-row gap-2 py-1 pr-5">
            <TransitionGroup name="slide">
              <li v-for="(type, index) in activity.selectedTypes" :key="index"
                class="p-1 px-2 text-sm rounded bg-slate-50 dark:bg-zinc-700 dark:text-zinc-300 border dark:border-zinc-800 flex gap-2 items-center">
                <div :style="{ backgroundColor: module.getColorByLabel(type) }"
                  class="w-4 h-4 min-w-4 min-h-4 bg-slate-600 rounded-full">
                </div>
                {{ type }}
              </li>
            </TransitionGroup>
          </ul>

          <div v-else class="p-2 bg-slate-100 dark:bg-zinc-900 mr-5 rounded">
            <p class="text-slate-500 italic text-center text-xs">No Learning Types selected</p>
          </div>
          <div class="flex justify-end pr-5">

          </div>
        </div>
        <div class="text-sm">
          <div class="flex justify-between items-center pr-5 pt-2 mb-1">
            <h3 class="font-medium text-gray-700 dark:text-gray-200">Alignments</h3>
            <UButton @click="toggleEditAlign" icon="i-heroicons-plus" size="sm" variant="ghost" />
          </div>
          <ul v-if="activity && activity.selectedAlignments && activity.selectedAlignments.length > 0"
            class="divide-y divide-slate-200 dark:divide-zinc-700 ml-1 flex flex-col pr-5">
            <li v-for="(alignment, index) in activity.selectedAlignments" class="py-2" :key="index">
              <div class="flex gap-3 items-center">
                <UIcon name="i-heroicons-check-circle-solid" class="min-w-5 min-h-5 text-teal-500" />
                <p v-if="alignment.nickname" class="">{{ alignment.nickname }}</p>
                <p v-else class="">{{ alignment.label }}</p>
              </div>
            </li>
          </ul>
          <div v-else class="p-2 bg-slate-100 dark:bg-zinc-900 mr-5 rounded">
            <p class="text-slate-500 italic text-center text-xs">No Alignments selected</p>
          </div>
        </div>
        <div class="text-sm">
          <div class="flex justify-between items-center pr-5 pt-2 mb-1">
            <h3 class="font-medium text-gray-700 dark:text-gray-200">Moodle Activities</h3>
            <UButton icon="i-heroicons-plus" size="sm" variant="ghost" />
          </div>
          <div class="p-2 bg-slate-100 dark:bg-zinc-900 mr-5 rounded">
            <p class="text-slate-500 italic text-center text-xs">No Moodle Activities selected</p>
          </div>
        </div>

      </div>

    </LayoutPanel>
    <Transition>
      <ActivitySettingsPanel v-if="editTypes" title="About Learning Types" :class="{ 'z-10': editTypes }"
        @close-panel="toggleEditTypes" id="activity-type-select">
        <template v-slot:description>
          <p>Associate Learning Types here.</p>
        </template>
        <div class="gap-5 mt-4">
          <div>
            About Learning types
          </div>
        </div>
      </ActivitySettingsPanel>
    </Transition>

    <Transition>
      <ActivitySettingsPanel v-if="editAlign" :title="'Assessment/Objective Alignments'" :class="{ 'z-10': editAlign }"
        @close-panel="toggleEditAlign" id="alignment-type-select">
        <template v-slot:description>
          <p>Select which Objectives and/or Assessments this Activity aligns with.</p>
        </template>
        <div v-for="(option, index) in module.alignmentOptions" :key="index">
          <div class="flex justify-between items-center mt-3 mb-1 pr-5">
            <label class="w-full" :for="'alignment-group-' + index">
              <h3 class=" text-sm text-slate-500 dark:text-zinc-400">{{ option.group }}</h3>
            </label>

            <UButton @click="toggleShowAlignments(index)" :id="'alignment-group-' + index"
              :trailing-icon="showAlignments[index] ? 'i-heroicons-chevron-down-solid' : 'i-heroicons-chevron-right-solid'"
              size="xs" variant="ghost" />
          </div>
          <Transition name="fade">
            <ul v-show="showAlignments[index]"
              class="flex flex-col divide-y divide-slate-200 dark:divide-zinc-700 ml-5">
              <li v-for="(item, index) in option.items" :key="index"
                class="dark:hover:!border-zinc-900 hover:!border-slate-100 -ml-5 flex gap-5 justify-between hover:bg-slate-100 dark:hover:bg-zinc-900 px-2 py-1 hover:rounded-s transition pr-5">

                <UFormGroup class="flex items-center justify-between w-full pt-2 mb-2">
                  <template #label>
                    <div class="flex justify-between gap-3 w-full pr-5">
                      <span
                        class="min-w-6 max-h-6 w-6 h-6 text-sm font-medium flex items-center justify-center bg-cyan-700 text-white rounded-full">{{
                          (index + 1) }}</span>

                      <span v-if="item.nickname">{{ item.nickname }}</span>
                      <span v-else>{{ item.label }}</span>
                    </div>
                  </template>
                  <UToggle v-model="isAligned(item).value"
                    :inputId="'activity-' + index + item.value + '-switch-' + index" />
                </UFormGroup>
              </li>
            </ul>
          </Transition>
        </div>
      </ActivitySettingsPanel>
    </Transition>
  </article>
  <ConfirmDialog />
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.1s ease, transform 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(5px);
}

.slide-move,
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(5px);
}

.slide-leave-active {
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
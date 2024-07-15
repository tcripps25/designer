<script setup>



const props = defineProps({
  message: String,
  title: String,
  cancel: String,
  confirm: String,
})
const modal = useModal()
const emit = defineEmits(['delete'])

function onDelete() {
  emit('delete')
}

const closeDialog = () => {
  modal.close()
}
</script>

<template>
  <UModal>
    <LayoutPanel :title="title">
      <template #subtitle>
        <div class="mb-10 mt-3 dark:text-zinc-400 text-slate-500">
          {{ message }}
        </div>
      </template>
      <template #action>
        <UButton variant="ghost" title="Close" class="text-sky-700" @click="closeDialog()" icon="i-heroicons-x-mark" />
      </template>
      <template #footer>
        <div class="flex gap-3 justify-end items-center">
          <UButton variant="outline" :label="cancel" class="text-sky-700" @click="closeDialog()" />
          <UButton color="red" :label="confirm" @click="onDelete" />
        </div>
      </template>
    </LayoutPanel>
  </UModal>
</template>

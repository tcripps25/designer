<script setup>
const props = defineProps({
  title: String,
})
</script>


<template>

  <LayoutPanel activity :title="title" tag="article"
    class="absolute top-0 h-[32rem] shadow-sm rounded-lg mb-5 p-5 flex flex-col z-10">
    <template v-slot:action>
      <UButton @click="$emit('closePanel')" title="Back to Activity" size="xs" variant="soft" label="Back"
        trailing-icon="i-heroicons-arrow-uturn-left-solid" />

    </template>
    <div class="overflow-x-auto -mr-5 -mb-5">
      <slot></slot>
    </div>
  </LayoutPanel>

</template>

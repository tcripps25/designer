<script setup>
const expanded = ref(true)

const toggleExpanded = () => {
  expanded.value = !expanded.value
}

const expandedIcon = () => {
  return expanded.value ? 'i-heroicons-chevron-left' : 'i-heroicons-chevron-right';
}
</script>

<template>
  <div class=" dark:border-zinc-800 transition-all  py-6 flex flex-col gap-5 bg-white dark:bg-zinc-900"
    :class="expanded ? 'min-w-80 max-w-80 px-5' : 'min-w-20 max-w-20 px-3'">
    <div class="h-full flex flex-col gap-5">
      <AppHeader :expanded="expanded" />
      <NavMainNavPanel :expanded="expanded" />
    </div>
    <div class="flex items-center" :class="expanded ? 'justify-between' : 'justify-center'">
      <span v-if="expanded"
        class="text-sm bg-sky-600 w-max px-1 self-center justify-self-end rounded text-sky-50">v0.010724</span>
      <UButton @click="toggleExpanded()" variant="ghost" :icon="expandedIcon()" :ui="{ rounded: 'rounded-full' }" />
    </div>
  </div>
</template>

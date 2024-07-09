<script setup>
const props = defineProps({
  expanded: Boolean
})
</script>

<template>
  <div class="w-full flex gap-4 items-center px-2" :class="expanded ? 'justify-start' : 'justify-center'">
    <img class="w-auto h-10" src="~/assets/img/uop_notext.png" alt="University of Portsmouth Logo" />
    <div v-show="expanded" class="flex flex-col">
      <h1 class="font-semibold text-sky-700 dark:text-zinc-200 text-lg">Module Designer</h1>
    </div>
  </div>
</template>

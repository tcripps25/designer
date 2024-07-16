<script setup>
const props = defineProps({
  title: String,
  suffix: String,
})
</script>

<template>
  <div
    class="px-5 py-3 -mx-5 -my-5 mb-5 sticky -top-5 bg-slate-50 dark:bg-zinc-800 border-slate-100 dark:border-zinc-800 flex justify-between z-50">
    <h1 class="text-slate-900 dark:text-zinc-400 font-semibold text-lg">
      {{ title }}
    </h1>
    <h2 v-if="suffix" class="text-md text-slate-500 dark:text-zinc-400"> {{
      suffix
      }}</h2>

    <slot></slot>

  </div>
</template>

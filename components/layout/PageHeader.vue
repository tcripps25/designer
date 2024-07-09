<script setup>
const props = defineProps({
  title: String,
})
</script>

<template>
  <div
    class="px-5 py-3 -mx-5 -my-5 mb-5 sticky -top-5 bg-slate-50 dark:bg-zinc-800 border-slate-100 dark:border-zinc-800 z-10 flex justify-between">
    <h1 class="font-semibold text-lg dark:text-zinc-200">{{ title }}</h1>

    <slot></slot>

  </div>
</template>

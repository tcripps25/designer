<script setup>
const props = defineProps({
  week: Object,
  index: Number,
  expanded: Boolean,
})

const route = useRoute();

const to = computed(() => `/design/week-${props.index}`);
const isActiveLink = computed(() => route.path === to.value);
</script>

<template>
  <NuxtLink :to="'/design/week-' + index"
    class="transition w-full flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded p-2"
    :class="{ 'justify-center': !expanded }"
    active-class="text-primary-800 bg-slate-100 dark:text-zinc-50 dark:bg-zinc-800"
    inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
    <div
      class="text-xs transition-all max-w-6 max-h-6 min-w-6 min-h-6 border-slate-300 dark:border-zinc-700 border-[.2rem] p-2 flex justify-center items-center rounded-full"
      :class="isActiveLink ? '!bg-sky-600 text-sky-50 !border-sky-600 dark:border-sky-600 shadow' : 'bg-white dark:bg-zinc-900',
        expanded ? 'absolute -left-8' : 'flex'">

      <span class="font-semibold">{{ index + 1 }}</span>
    </div>
    <div v-show="expanded" class="flex flex-col">
      <div class="">{{ week.name }}</div>
      <div class="text-xs text-slate-600 dark:text-zinc-300">{{ week.formattedDate }}</div>
    </div>
  </NuxtLink>
</template>
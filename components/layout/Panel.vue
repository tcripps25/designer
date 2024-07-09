<script setup>
const props = defineProps({
  title: String,
  borderless: Boolean,
  flush: Boolean,
  sidebar: Boolean,
  limit: Boolean,
});
</script>

<template>
  <div class="bg-white dark:bg-zinc-900 rounded-lg grow w-full"
    :class="{ ' shadow-sm': !borderless }, { 'p-5': !flush }, { 'bg-transparent -mx-5 px-5 pt-5 rounded-none': sidebar }, { ' max-w-3xl mx-auto': limit }">
    <div class="flex justify-between mb-1" v-if="$slots.title || title || $slots.action">
      <!-- for usage without using props -->
      <slot v-if="$slots.title || title" name="title">
        <h2 v-if="title" class="text-xl font-semibold">{{ title }}</h2>
      </slot>
      <div class="ml-auto" v-if="$slots.action">
        <slot v-if="$slots.action" name="action" />
      </div>
    </div>
    <div v-if="$slots.subtitle" class="mb-5 text-sm">
      <slot name="subtitle" />
    </div>
    <slot></slot>
  </div>
</template>
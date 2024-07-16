<script setup>
const props = defineProps({
  title: String,
  borderless: Boolean,
  flush: Boolean,
  sidebar: Boolean,
  limit: Boolean,
  to: String,
  activity: Boolean,
});
</script>

<template>
  <div class="bg-white dark:bg-zinc-800 rounded-lg grow w-full border dark:border-zinc-800"
    :class="{ ' shadow-sm': !borderless }, { 'p-5': !flush }, { 'bg-transparent -mx-5 px-5 pt-5 rounded-none': sidebar }, { ' max-w-3xl mx-auto': limit }">
    <div class="flex justify-between items-center mb-1 rounded-t-lg"
      :class="{ 'border border-sky-700 dark:border-zinc-900 py-1 max-h-11 min-h-11 -mt-5 !mb-0 shadow-sm -mx-5 px-5 relative z-10 bg-sky-700 text-sky-50 dark:bg-zinc-950': activity }"
      v-if="$slots.title || title || $slots.action">
      <!-- for usage without using props -->
      <slot v-if="$slots.title || title" name="title">
        <!-- add a link if we recieve the to prop -->
        <ULink v-if="to && title" :to="to" class="hover:underline underline-offset-4">
          <h2 class="text-xl font-semibold">{{ title }}</h2>
        </ULink>
        <!-- plain title otherwise -->
        <h2 v-else v-if="title" :class="activity ? 'text-md font-medium' : 'text-xl font-semibold'">{{ title }}
        </h2>
      </slot>
      <div class="ml-auto" v-if="$slots.action">
        <slot v-if="$slots.action" name="action" />
      </div>
    </div>

    <div v-if="$slots.subtitle" class="mb-5 text-sm">
      <slot name="subtitle" />
    </div>
    <slot></slot>
    <div v-if="$slots.footer" class="mt-5 text-sm">
      <slot name="footer" />
    </div>
  </div>
</template>
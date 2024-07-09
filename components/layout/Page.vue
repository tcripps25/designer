<script setup>
const props = defineProps({
  title: String,
})
</script>

<template>
  <div class="grow my-5 flex overflow-hidden rounded-s-lg  border-slate-200 dark:border-zinc-800">
    <div class="bg-slate-100 dark:bg-black grow flex-col">
      <div class="p-5 overflow-y-auto overflow-x-hidden h-full flex flex-col">
        <LayoutPageHeader :title="title">
          <slot name="action"></slot>
        </LayoutPageHeader>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

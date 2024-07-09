<script setup>

const props = defineProps({
  info: Boolean,
  warning: Boolean,
  enable: Boolean
});
</script>

<template>
  <div class="flex flex-col gap-2 p-3 bg-gradient-to-b mt-7 to-white border-t -mx-5 px-5" :class="{
    'from-blue-50 border-blue-100 text-blue-900': info || !info,
    'from-red-50 border-red-100 text-red-900': warning,
    'from-teal-50 border-teal-100 text-teal-900': enable
  }">
    <img src="~/assets/img/enable-sm.png" v-if="enable" alt="Enable Logo"
      class="w-24 h-max -mt-6 p-1 mb-2 bg-white rounded shadow">
    <UIcon v-else-if="warning" class="w-7 h-7 -mt-7 text-red-400" name="i-heroicons-exclamtion-triangle" />
    <UIcon v-else class="w-6 h-6 -mt-6 text-blue-400" name="i-heroicons-information-circle-solid" />
    <p class="pb-5">
      <slot />
    </p>
  </div>
</template>
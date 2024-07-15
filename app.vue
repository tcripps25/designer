<script setup>



</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <div class="flex grow h-screen overflow-hidden">
      <LayoutMainSidebar />
      <div class="flex grow bg-white dark:bg-zinc-900">
        <NuxtPage />
      </div>
    </div>
    <UModals />
    <UNotifications />
  </div>
</template>

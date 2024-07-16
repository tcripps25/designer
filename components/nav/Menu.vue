<script setup>

const props = defineProps({
  menu: Object,
  expanded: Boolean
})
const module = useModulesStore()
const visible = ref(true)

const toggleVisible = () => {
  visible.value = !visible.value
}



</script>

<template>
  <nav :id="menu.name + '-navigation'" role="navigation" class="text-sm flex relative flex-col">
    <UButton v-show="expanded" @click="toggleVisible()" variant="ghost"
      class="mb-1 hover:bg-slate-100 dark:hover:bg-zinc-800">
      <div class="flex justify-between items-center grow text-slate-400 dark:text-zinc-500">
        <h3 class="text-sm font-medium">{{ menu.name }}</h3>
        <UIcon class="w-4 h-4 transition" :class="{ '-rotate-90': !visible }" name="i-heroicons-chevron-down" />
      </div>
    </UButton>
    <Transition name="list">
      <ul v-show="visible" class="flex flex-col gap-1">
        <li v-for="(link, index) in menu.links">
          <NuxtLink :to="link.to"
            class="transition w-full flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded p-2"
            :class="{ 'justify-center': !expanded }"
            exact-active-class="text-primary-800 dark:text-zinc-50 bg-slate-100 dark:bg-zinc-800"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <UIcon class="w-4 h-4" :class="{ 'w-5 h-5': !expanded }" :name="link.icon" />
            <span v-show="expanded">{{ link.label }}</span>
          </NuxtLink>
          <ul
            class="relative flex flex-col mt-1 gap-1 before:content[''] before:w-[.25rem] before:rounded before:top-6 before:bottom-6 before:absolute before:bg-slate-200 before:dark:bg-zinc-700"
            v-if="link.label == 'Design'"
            :class="expanded ? 'ml-10 before:-left-[1.35rem]' : 'ml-0 before:left-[1.6rem]'">
            <TransitionGroup name="list">
              <li v-for="(week, index) in module.weeks" :key="index" class="relative z-10">
                <NavWeekLink :week="week" :index="index" :expanded="expanded" />
              </li>
            </TransitionGroup>
          </ul>
        </li>
      </ul>
    </Transition>
  </nav>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  margin-top: -10px;
}
</style>
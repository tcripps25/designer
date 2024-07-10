<script setup>
import WeekSummary from '~/components/WeekSummary.vue';

const module = useModulesStore()

const route = useRoute();

// Check if the current route is '/design' or any of its sub-routes
const isWeekPage = computed(() => /\/design\/week-.*/.test(route.path));
</script>

<template>

  <NuxtPage v-if="isWeekPage"></NuxtPage>



  <LayoutPage v-else title="Design">
    <template v-slot:action>
      <UButton @click="module.incrementWeek()" label="Add Week" title="Add Week" class="h-max">
      </UButton>
    </template>
    <div class="w-100 grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
      <TransitionGroup>
        <div v-for="(week, weekIndex) in module.weeks" :key="weekIndex" :week="week" :weekIndex="weekIndex"
          class="flex flex-col flex-wrap gap-5">
          <WeekSummary :week="week" :index="weekIndex" />
        </div>
      </TransitionGroup>
    </div>

  </LayoutPage>




</template>



<style></style>
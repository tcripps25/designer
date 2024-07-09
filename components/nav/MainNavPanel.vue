<script setup lang="ts">
const route = useRoute()

const menus =
  [{
    name: 'Get Started',
    links: [
      {
        label: 'About Module Designer',
        icon: 'i-heroicons-information-circle-solid',
        to: ''
      },
      {
        label: 'Quick Guide',
        icon: 'i-heroicons-document-text-solid',
        to: ''
      },
    ]
  },
  {
    name: 'Main Menu',
    links: [
      {
        label: 'Set Up',
        icon: 'i-heroicons-cog-8-tooth-solid',
        to: '/setup'
      },
      {
        label: 'Design',
        icon: 'i-heroicons-paint-brush-solid',
        to: '/design'
      },
      {
        label: 'Visualise',
        icon: 'i-heroicons-chart-pie-solid',
        to: '/visualise'
      },
      {
        label: 'Publish',
        icon: 'i-heroicons-arrow-up-on-square-solid',
        to: '/publish'
      }
    ]
  }];

const props = defineProps({
  expanded: Boolean
})
</script>

<template>
  <NavMenu v-for="(menu, index) in menus" :menu="menu" :expanded="expanded" />
</template>

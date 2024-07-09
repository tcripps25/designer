<script setup>
const module = useModulesStore()
const route = useRoute()

const week = module.getWeek(route.params.index)
</script>

<template>
    <LayoutPage title="Design">
        <template v-slot:action>
            <UButton @click="module.addActivity(route.params.index)" label="Add Activity" title="Add Activity">
            </UButton>
        </template>
        {{ week.name }}

        <ul>
            <li v-for="(activity, index) in week.activities">
                {{ activity.name }}
            </li>
        </ul>
    </LayoutPage>
</template>
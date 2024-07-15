<script setup>



const module = useModulesStore()
const route = useRoute()

const week = module.getWeek(route.params.index)
</script>

<template>
    <LayoutPage title="Design" :suffix="week.name + ' - ' + week.formattedDate">

        <template v-slot:action>
            <UButton @click="module.addActivity(route.params.index)" label="Add Activity" title="Add Activity"
                class="h-max">
            </UButton>
        </template>
        <UFormGroup label="Week Name">
            <UInput v-model="week.name" />
        </UFormGroup>
        <div class="flex flex-wrap gap-5 mt-5">
            <Activity v-for="(activity, index) in week.activities" :activity="activity" :index="index" />
        </div>
    </LayoutPage>
</template>
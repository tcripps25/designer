<script setup>
import Panel from '~/components/layout/Panel.vue';
import { useModulesStore } from '@/stores/modules.js'
const module = useModulesStore()
import { format } from 'date-fns'


</script>


<template>
  <LayoutPage title="Set Up">
    <div class="flex flex-col gap-5">
      <Panel limit title="Module Information">
        <template v-slot:subtitle>
          <p>Basic information about your Module</p>
        </template>
        <div class="flex flex-col gap-5 mt-10">
          <UFormGroup label="Module title">
            <UInput v-model="module.title" />
          </UFormGroup>
          <UFormGroup label="Module code">
            <UInput v-model="module.code" />
          </UFormGroup>

          <UFormGroup label="Module start date">
            <UPopover :popper="{ placement: 'bottom-start' }">
              <UButton :label="format(module.startDate, 'd MMM, yyy')" />
              <template #panel="{ close }">
                <FormDatePicker v-model="module.startDate" is-required @close="close" />
              </template>
            </UPopover>
          </UFormGroup>
        </div>
      </Panel>
      <Panel limit title="Learning Outcomes">
        <template v-slot:subtitle>
          <p>Learning outcomes are populated automatically.</p>
        </template>
        <div class="flex flex-col gap-5 mt-10">
          <UFormGroup v-for="(outcome, index) in module.learningOutcomes" :label="'Learning Outcome ' + (index + 1)">
            <UInput disabled v-model="outcome.label" />
          </UFormGroup>
        </div>
      </Panel>
      <Panel limit title="Assessments">
        <template v-slot:subtitle>
          <p>Assessments shown below have been populated automatically.</p>
        </template>


        <div class="flex flex-col gap-5 mt-10">
          <UFormGroup v-for="(assessment, index) in module.assessments"
            :label="'Alternative title for assessment ' + (index + 1)">
            <UInput v-model="assessment.label" />
          </UFormGroup>
        </div>

      </Panel>
    </div>
  </LayoutPage>
</template>


<style></style>
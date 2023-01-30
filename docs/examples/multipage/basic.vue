<script lang="ts" setup>
import { SkMultipage } from '@skzz-platform/components/multipage'
import { ref } from 'vue'
const currentPage = ref('tab1')
const modules = ref([
  { label: 'Tab 1', value: 'tab1' },
  { label: 'Tab 2', value: 'tab2' },
  { label: 'Tab 3', value: 'tab3' },
])
</script>
<template>
  <SkMultipage v-model="currentPage" :modules="modules">
    <template #tab1__options>
      <ElButton>111</ElButton>
    </template>
    <template #tab1>
      <div>111</div>
    </template>

    <template #tab2__options>
      <ElButton>222</ElButton>
    </template>
    <template #tab2>
      <div>222</div>
    </template>
    
  </SkMultipage>
</template>
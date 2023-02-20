<script lang="tsx" setup>
import { SkAppTables, __SkAppTables } from '@skzz-platform/components/app-tables'
import { SkAppOperations } from '@skzz-platform/components/app-operations'
import { ref } from 'vue'
const data = [
  ...Array.from({ length: 100 }).map((_, i) => {
    return {
      name: `name-${i}`,
      id: i,
    }
  }),
]
const colSource:__SkAppTables.Column[] = [
  {
    type: 'selection',
    width: 60,
    flexGrow: 0,
  },
  {
    type: 'index',
    width: 50,
    flexGrow: 0,
    title: '序号',
  },
  {
    key: 'name',
    dataKey: 'name',
    width: 100,
    title: '姓名',
  },
  {
    type: 'button',
    width: 250,
    title: '操作',
    
    cellRenderer: () => {
      return <SkAppOperations></SkAppOperations>
    },
  },


]
const currentSelect = ref([])
</script>
<template>

  <SkAppTables 
    v-model="currentSelect"
    :style="{
      height: '500px',
    }" 
    :columns="colSource" 
    :data="data"
    :total="100"
  >
  </SkAppTables>

  <p>  {{  currentSelect  }}</p>
</template>
<style>

</style>
<script lang="tsx" setup>
import { SkAppTables, __SkAppTables } from '@skzz-template/components/app-tables'
import { SkAppOperations } from '@skzz-template/components/app-operations'
const data = [
  ...Array.from({ length: 100 }).map((_, i) => {
    return {
      name: `name-${i}`,
    }
  }),
]
const colSource:__SkAppTables.Column[] = [
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


]
</script>
<template>
  <SkAppTables 
    :style="{
      height: '500px',
    }" 
    :columns="colSource" 
    :data="data"
    :total="100"
  >
  </SkAppTables>
</template>
<style>

</style>
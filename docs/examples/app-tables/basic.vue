<script lang="tsx" setup>
import { SkAppTables, __SkAppTables } from '@skzz-platform/components/app-tables'

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
    type: 'button',
    width: 150,
    title: '操作',
  },
  {
    key: 'name',
    dataKey: 'name',
    width: 100,
    title: '姓名',
  },
  {
    key: 'operations',
    title: '操作',
    width: 160,
    cellRenderer: () => {
      return <div>
        <el-button>编辑</el-button>
        <el-button>删除</el-button>
      </div>
    },
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
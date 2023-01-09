<script lang="tsx" setup>
import { ElButton, ElTable } from 'element-plus'
import { VkTableColumns, __VkTableColumns } from '@vunk/skzz/components/table-columns'
const data = [
  {
    name: 'cx',
  },
]
const colSource:__VkTableColumns.Source[] = [
  {
    prop: 'name',
    label: '姓名',
    width: 100,

  },
  {
    label: '操作',
    slots: {
      default: ({ row }) => {
        return <div >
          <ElButton>编辑</ElButton>
          <ElButton>详情</ElButton>
        </div>
      },
    },
  },
]
</script>
<template>
  <ElTable :data="data">
    <VkTableColumns :source="colSource"></VkTableColumns>
  </ElTable>
</template>

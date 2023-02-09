<script lang="tsx" setup>
import { ElButton, ElTable } from 'element-plus'
import { VkTableColumns, __VkTableColumns } from '@vunk/skzz/components/table-columns'
import { SkAppCard } from '@skzz-platform/components/app-card'
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
  <div plr-page pb-page class="h-main">
    <div class="bg-bg-overlay h-100%">
      <SkAppCard :header="'表格页面'">

        <ElTable :data="data" :border="true">
          <VkTableColumns :source="colSource"></VkTableColumns>
        </ElTable>

      </SkAppCard>

    </div>
  </div>

</template>

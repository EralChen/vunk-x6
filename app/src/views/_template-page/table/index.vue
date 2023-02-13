<script lang="tsx" setup>
import { SkAppCard } from '@skzz-platform/components/app-card'
import { SkAppTables, __SkAppTables } from '@skzz-platform/components/app-tables'
import { SkAppForm } from '@skzz/platform'
const data = [
  {
    name: 'cx',
  },
]
const colSource:__SkAppTables.Column[] = [
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
  <div plr-page pb-page class="h-main">
    <div class="bg-bg-overlay h-100%">
      <SkAppCard :header="'表格'" class="h-100%">
        <SkAppTables
          :data="data"
          :columns="colSource"
        >
        </SkAppTables>
      </SkAppCard>


    </div>
  </div>

</template>

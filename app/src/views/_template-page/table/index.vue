<script lang="tsx" setup>
import PageX from '_c/PageX/index.vue'
import { SkAppCard } from '@skzz-platform/components/app-card'
import { VkDuplexCalc } from '@vunk/core'
import { SkAppTables, __SkAppTables } from '@skzz-platform/components/app-tables'
import { SkAppQueryForm, __SkAppQueryForm } from '@skzz-platform/components/app-query-form'

const formItems: __SkAppQueryForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '姓名',
  },
  {
    templateType: 'VkfInput',
    prop: 'age',
    label: '年龄',
  },
  {
    templateType: 'VkfSelect',
    prop: 'city',
    label: '城市',
  },
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '姓名',
  },
  {
    templateType: 'VkfInput',
    prop: 'age',
    label: '年龄',
  },
  {
    templateType: 'VkfSelect',
    prop: 'city',
    label: '城市',
  },
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '姓名',
  },
  {
    templateType: 'VkfInput',
    prop: 'age',
    label: '年龄',
  },
  {
    templateType: 'VkfSelect',
    prop: 'city',
    label: '城市',
  },
  {
    templateType: 'VkfButton',
    buttonLabel: '查询',
  },
]
const data = [
  {
    name: 'cx',
  },
]
const colSource: __SkAppTables.Column[] = [
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
  <PageX>
    <SkAppCard :header="'表格'" class="h-100%">
      <VkDuplexCalc class="plr-page ptb-tab-ptb">
        <template #one>
          <SkAppQueryForm :formItems="formItems" :fixes="4"></SkAppQueryForm>

          <div>1111</div>
        </template>

        <SkAppTables class="h-100%" :data="data" :columns="colSource">
        </SkAppTables>
      </VkDuplexCalc>

    </SkAppCard>
  </PageX>
</template>

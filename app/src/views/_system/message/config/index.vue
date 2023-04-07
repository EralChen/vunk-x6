<template>
  <PageX>
    <SkAppCard :header="'消息数据'" class="h-100%">
      <VkDuplexCalc class="gap-main-x">
        <template #one>
          <SkAppQueryForm :fixes="2" :data="formData" @setData="setData(formData, $event)" :formItems="queryItems">
            <template #options>
              <ElButton type="primary" @click="$router.push('/system/message/config/add')">新增</ElButton>
            </template>
          </SkAppQueryForm>
        </template>
        <SkAppTablesV1 :defaultExpandAll="true" flex-1 :rowKey="'menuId'" :columns="tableState.columns"
          :data="tableState.data" :total="tableState.total" v-model:page-size="tableState.pagination.pageSize"
          v-model:start="tableState.pagination.start">
        </SkAppTablesV1>
      </VkDuplexCalc>
    </SkAppCard>
  </PageX>
</template>

<script lang="tsx" setup>
import PageX from '_c/PageX/index.vue'
import {
  SkAppCard,
  __SkAppTables,
  SkAppQueryForm, __SkAppQueryForm,
} from '@skzz/platform'
import { SkAppOperations, SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { NormalObject, VkDuplexCalc, setData } from '@vunk/core'
import { reactive, ref, watch } from 'vue'
import { rMessageConfigList } from '@skzz-platform/api/system/message/config'
import { Row } from './types'
type Col = __SkAppTablesV1.Column<Row>

const tableState = reactive({
  data: [] as Row[],
  _columns: [
    {
      prop: 'path',
      label: '跳转路由',
    },
    {
      prop: 'param',
      label: '路由参数',
    },
    {
      prop: 'client',
      label: '接收端',
    },
    {
      prop: 'clientplIdt',
      label: '消息模板ID',
    },
    {
      prop: 'type',
      label: '业务类型',
    },
    {
      prop: 'requireRead',
      label: '要求已读回执',
      formatter: (row) => {
        return row.requireConfirm ? '是' : '否'
      },
    },
    {
      prop: 'requireConfirm',
      label: '要求确认回执',
      formatter: (row) => {
        return row.requireConfirm ? '是' : '否'
      },
    },
    {
      prop: undefined,
      label: '操作',
      width: '400em',
      slots: ({ row }) => <SkAppOperations
        modules={['r', 'u', 'run', 'nodes', 'd']}>
      </SkAppOperations>,
      align: 'center',
      headerAlign: 'center',
    },
  ] as Col[],
  columns: [] as Col[],
  query: {},
  pagination: {
    pageSize: 10,
    start: 0,
  },
  total: 0,
})

const queryItems: __SkAppQueryForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '接收人',
    clearable: true,
    class: 'w-200px',
  },
]



const formData = ref({
  type: 'all',
} as NormalObject)


watch(() => tableState.pagination, r, { deep: true, immediate: true })
function r () {
  return rMessageConfigList(tableState.pagination).then(res => {
    if (!res) {
      return
    }
    if (!tableState.columns.length) {
      tableState.columns = [
        // ...res.columns as Col[],
        ...tableState._columns,
      ]
    }
    tableState.data = res.rows
    tableState.total = res.total
  })
}

</script>


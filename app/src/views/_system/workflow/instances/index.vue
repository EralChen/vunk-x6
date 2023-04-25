<script lang="tsx" setup>
import { reactive, watch } from 'vue'
import { FlowNodeInstance, rInstanceList } from '@skzz-platform/api/system/workflow'
import { SkAppOperations, SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { VkDuplexCalc } from '@vunk/core'
import { useResolveQueryU, useRouterTo } from '@skzz-platform/composables'
import { useWorkflowResolveQueryU } from '../utils'

type Row = FlowNodeInstance
type Col = __SkAppTablesV1.Column<Row>
const props = defineProps({
  flowId: {
    type: String,
    required: true,
  },
})
const { routerNext } = useRouterTo()
const tableState = reactive({
  data: [] as Row[],
  _columns: [
    {
      prop: 'status',
      label: '流程实例状态',
      formatter: (row) => {
        const map: Record<string, string> = {
          '-10': '驳回',
          10: '通过',
          0: '审核中',
        }
        return map[row.status]
      },
      width: 0,
    },
    {
      prop: undefined,
      label: '操作',
      width: '250em',
      slots: ({ row }) => {
        const modules = ['r']

        return <SkAppOperations
          modules={modules}
          onR={() => rI(row.id)}
        >
        </SkAppOperations>
      },
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

const { addListener } = useWorkflowResolveQueryU()
addListener(() => r())

function rI (id: string) {
  routerNext({
    path: 'read/' + id,
  })
}

watch(() => tableState.pagination, r, { deep: true, immediate: true })
function r () {
  return rInstanceList(tableState.pagination, props.flowId).then(res => {
    if (!tableState.columns.length) {
      tableState.columns = [
        ...res.columns.filter(item => item.prop !== 'status') as Col[],
        ...tableState._columns,
      ]
    }
    tableState.data = res.rows
    tableState.total = res.total
  })
}

</script>
<template>
  <PageOver>
    <VkDuplexCalc :gap="'var(--gap-page)'" class="pa-page h-full">
      <template #one>
        <div sk-flex="row-between-center">
          <span></span>
        </div>
      </template>

      <SkAppTablesV1 :defaultExpandAll="true" flex-1 :rowKey="'menuId'" :columns="tableState.columns"
        :data="tableState.data" :total="tableState.total" v-model:page-size="tableState.pagination.pageSize"
        v-model:start="tableState.pagination.start">
      </SkAppTablesV1>

    </VkDuplexCalc>
    <RouterView></RouterView>

  </PageOver>

</template>

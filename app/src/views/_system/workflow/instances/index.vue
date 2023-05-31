<script lang="tsx" setup>
import { reactive, watch } from 'vue'
import { FlowNodeInstance, rInstanceList, withdrawApproval } from '@skzz-platform/api/system/workflow'
import { SkAppOperations, SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { VkDuplexCalc } from '@vunk/core'
import { useRouterTo } from '@skzz-platform/composables'
import { useWorkflowResolveQueryU } from '../utils'
import { ElMessageBox } from 'element-plus'

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
        const modules = ['r', 'withdraw']

        return <SkAppOperations
          modules={modules}
          onR={() => rI(row.id)}
        >
          {{
            withdraw: () => {
              return <el-button type='warning' onClick={() => doWithDraw(row.id)} size='small'>撤回</el-button>
            },
          }}
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

function doWithDraw (flowInstId: string) {
  ElMessageBox.confirm('确定撤回吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    withdrawApproval(flowInstId)
      .then(r)
  }).catch(() => {
    //
  })
}

</script>
<template>
  <PageOver>
    <VkDuplexCalc
      :gap="'var(--gap-page)'"
      class="pa-page h-full"
    >
      <template #one>
        <div sk-flex="row-between-center">
          <span />
        </div>
      </template>

      <SkAppTablesV1
        v-model:page-size="tableState.pagination.pageSize"
        v-model:start="tableState.pagination.start"
        :default-expand-all="true"
        flex-1
        :row-key="'menuId'"
        :columns="tableState.columns"
        :data="tableState.data"
        :total="tableState.total"
      />
    </VkDuplexCalc>
    <RouterView />
  </PageOver>
</template>

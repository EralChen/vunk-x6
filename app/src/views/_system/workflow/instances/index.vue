<script lang="tsx" setup>
import { reactive, watch } from 'vue'
import { rWorkflows} from '@skzz-platform/api/system/workflow'
import { SkAppOperations, SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { VkDuplexCalc } from '@vunk/core'
import { useRouterTo } from '@skzz-platform/composables'

type Row = any
type Col = __SkAppTablesV1.Column<Row>
const { routerNext } = useRouterTo()
const tableState = reactive({
  data: [] as Row[],
  _columns: [
    {
      prop: 'name',
      label: '名称',
    },
    {
      prop: 'itemId',
      label: '关联业务ID',
    },
    {
      prop: 'formName',
      label: '关联表单名称',
    },
    {
      prop: 'formVersion',
      label: '关联表单版本',
    },
    {
      prop: 'isStart',
      label: '是否启动',
      slots: ({ row }) => <span>{row.isStart ? '是' : '否'}</span>,
    },

    {
      prop: undefined,
      label: '操作',
      width: '450em',
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

function rI (id: string) {
  routerNext({
    path: 'read/' + id,
  })
}

watch(() => tableState.pagination, r, { deep: true, immediate: true })
function r () {
  return rWorkflows({}, tableState.pagination).then(res => {
    if (!tableState.columns.length) {
      tableState.columns = [
        ...res.columns as Col[],
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
  </PageOver>
  <RouterView></RouterView>

</template>

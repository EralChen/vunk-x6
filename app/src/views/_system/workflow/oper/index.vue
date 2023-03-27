<script lang="tsx" setup>
import { computed, reactive, watch } from 'vue'
import { rWorkflowOpers, dWorkflowOpers, cuWorkflowOper } from '@skzz-platform/api/system/workflow'
import { SkAppDialog, SkAppOperations, SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { setData, VkDuplexCalc } from '@vunk/core'
import CUForm from './cu-form/index.vue'
import { WorkflowOper as Row } from '../types'
import { useRouterTo } from '@skzz-platform/composables'
import { ElButton } from 'element-plus'
type Col = __SkAppTablesV1.Column<Row>
const { routerNext }  = useRouterTo()
const tableState = reactive({
  data: [] as Row[],
  _columns: [
    {
      prop: 'operName',
      label: '操作人名称',
    },

    {
      prop: undefined,
      label: '操作',
      width: '400em',
      slots: ({ row }) => <SkAppOperations
        modules={[ 'u', 'd']}
        onU={ () => preuI(row) }
        onD={ () => d([row.operId])  }
      >
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
const cuState = reactive({
  type: '' as 'c' | 'u' | '',
  data: {} as Partial<Row>,
})
const cuData = computed(() => {
  return {
    ...cuState.data,
  }
})


watch(() => tableState.pagination, r, { deep: true, immediate: true })
function r () {
  return rWorkflowOpers({}, tableState.pagination).then(res => {
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
function d (ids: string[]) {
  dWorkflowOpers(ids).then(() => {
    r()
  })
}
function precI () {
  cuState.type = 'c'
  cuState.data = {}
}
function preuI (row: Row) {
  cuState.type = 'u'
  cuState.data = {...row}
}
function cuI () {
  cuWorkflowOper(cuData.value).then(() => {
    r()
    cuState.type = ''
  })
}


</script>
<template>
  <page-x>
    <VkDuplexCalc :gap="'var(--gap-page)'" class="pa-page h-full">
      <template #one>
        <div sk-flex="row-between-center">
          <span></span>
          <ElButton type="primary" sk-flex="row_center"
            @click="precI()"
          >
            <span>新增</span>
          </ElButton>
        </div>

      </template>

      <SkAppTablesV1 
        :defaultExpandAll="true"
        flex-1
        :rowKey="'menuId'"
        :columns="tableState.columns"
        :data="tableState.data"
        :total="tableState.total"
        v-model:page-size="tableState.pagination.pageSize"
        v-model:start="tableState.pagination.start"
      >
      </SkAppTablesV1>


    </VkDuplexCalc>

    <SkAppDialog
      :modelValue="!!cuState.type"
      @update:modelValue="cuState.type = ''"
      :title="cuState.type === 'u' ? '编辑' : '新增'"
    >
      <CUForm
        :type="cuState.type"
        :data="cuState.data"
        @setData="setData(cuState.data, $event)"
        @submit="cuI"
      ></CUForm>
    </SkAppDialog>
  </page-x>
</template>

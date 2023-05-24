<script lang="tsx" setup>
import { reactive, ref } from 'vue'
import { rDataModels, dDataModels, cuDataModel } from '@skzz-platform/api/system/data-model'
import { SkAppDialog, SkAppOperations, SkAppTablesV1, __SkAppTablesV1, Pagination } from '@skzz/platform'
import { FirstParameter, setData, VkDuplexCalc } from '@vunk/core'
import CUForm from './cu-form/index.vue'
import { Row } from './types'
import { genColumnsV1 } from '@skzz-platform/shared/utils-data'
type Col = __SkAppTablesV1.Column<Row>


const tableState = reactive({
  data: [] as Row[],
  _columns: [ ] as Col[],
  columns: [] as Col[],
  query: {},
  total: 0,
})
const pagination = ref<Pagination>({
  pageSize: 10,
  start: 0,
})
const cuIState = reactive({
  type: '' as 'c' | 'u' | '',
  data: {} as FirstParameter<typeof cuDataModel>,
})


const operationsCol: Col =  {
  prop: undefined,
  label: '操作',
  width: '200em',
  slots: ({ row }) => <SkAppOperations
    modules={[  'd']}
    onD={ () => d([row])  }
  >
  </SkAppOperations>,
  align: 'center',
  headerAlign: 'center',
}
const propToCol = {
  
} as Record<keyof Row, Partial<Col> | null>
const typeToCol: Record<string, Col> = {
  button: operationsCol,
}
r()
function r () {
  return rDataModels({}, pagination.value).then(res => {
    if (!tableState.columns.length) {
      tableState.columns = genColumnsV1<Col>(
        res.columns, 
        propToCol, 
        typeToCol,
      )

      tableState.columns.push(operationsCol)
    }
    tableState.total = res.total
    tableState.data = res.rows
  })
}
function d (ids: Row[]) {
  dDataModels(ids).then(() => {
    r()
  })
}
function precI () {
  cuIState.type = 'c'
  cuIState.data = {}
}

function cuI () {
  cuDataModel(cuIState.data)
}
</script>
<template>
  <page-x>
    <VkDuplexCalc
      :gap="'var(--gap-page)'"
      class="pa-page h-full"
    >
      <template #one>
        <div sk-flex="row-between-center">
          <span />
          <ElButton
            type="primary"
            sk-flex="row_center"
            @click="precI()"
          >
            <span>新增</span>
          </ElButton>
        </div>
      </template>

      <SkAppTablesV1 
        v-model:page-size="pagination.pageSize"
        v-model:start="pagination.start"
        :modules="[]"
        flex-1
        :row-key="'menuId'"
        :columns="tableState.columns"
        :data="tableState.data"
        :total="tableState.total"
      />
    </VkDuplexCalc>

    <SkAppDialog
      :model-value="!!cuIState.type"
      :title="cuIState.type === 'u' ? '编辑' : '新增'"
      @update:modelValue="cuIState.type = ''"
    >
      <CUForm
        :type="cuIState.type"
        :data="cuIState.data"
        @setData="setData(cuIState.data, $event)"
        @submit="cuI"
      />
    </SkAppDialog>
  </page-x>
</template>

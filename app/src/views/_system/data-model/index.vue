<script lang="tsx" setup>
import { VkCheckboxTree, __VkCheckboxTree } from '@vunk/skzz/components/checkbox-tree'
import { computed, reactive, watch } from 'vue'
import { rDataModels, dDataModels } from '@skzz/platform/api/system/data-model'
import { SkAppDialog, SkAppOperations, SkCheckTags, __SkCheckTags, SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { setData, unsetData, VkDuplexCalc, VkDuplex } from '@vunk/core'
import CUForm from './cu-form/index.vue'
import { Row } from './types'
import SkAppIcon from '@skzz/platform/components/app-icon'
type Col = __SkAppTablesV1.Column<Row>

const tableState = reactive({
  data: [] as Row[],
  _columns: [
    {
      prop: undefined,
      label: '操作',
      width: '200em',
      slots: ({ row }) => <SkAppOperations
        modules={[ 'u', 'd']}
        onD={ () => d([row.modelId])  }
        onU={ () => preuI(row) }
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

r()
function r () {
  return rDataModels({}, tableState.pagination).then(res => {
    if (!tableState.columns.length) {
      tableState.columns = [
        ...res.columns as Col[],
        ...tableState._columns,
      ]
    }
    tableState.data = res.rows
  })
}
function d (ids: string[]) {
  dDataModels(ids).then(() => {
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
  //
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

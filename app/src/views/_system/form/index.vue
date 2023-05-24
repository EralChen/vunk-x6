<template>
  <PageX>
    <VkDuplexCalc class="pa-page h-100%">
      <template #one>
        <SkAppQueryForm
          :form-items="queryItems"
          :data="queryState.data"
          @setData="setData(queryState.data, $event)"
        >
          <template #options>
            <SkIncreaseButton 
              :btns="rFormBtns"
              @click="$router.push('/system/form/add')"
            />
          </template>
        </SkAppQueryForm>
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
  </PageX>
</template>

<script lang="tsx" setup>
import PageX from '_c/PageX/index.vue'
import { __SkAppQueryForm , SkAppOperations, SkAppTablesV1, __SkAppTablesV1, SkAppQueryForm } from '@skzz/platform'
import { reactive, watch } from 'vue'
import { dForm, rFormList, rFormBtns } from '@skzz-platform/api/system/form'
import { setData, VkDuplexCalc } from '@vunk/core'
import { Row } from './types'
import router from '@/router'
import { debounce } from 'lodash'
import { SkIncreaseButton } from '@skzz-platform/components/increase-button'

type Col = __SkAppTablesV1.Column<Row>
const queryItems: __SkAppQueryForm.CoreFormItem[]  = [
  {
    templateType: 'VkfInput',
    label: '表单名称',
    prop: 'formName',
  },
]
const queryState = reactive({
  data: {} as Partial<Row>,
})
const tableState = reactive({
  data: [] as Row[],
  _columns: [
    {
      prop: 'formName',
      label: '表单名称',
    },
    {
      prop: 'versionTag',
      label: '版本',
    },
    {
      prop: undefined,
      label: '操作',
      width: '200em',
      align: 'center',
      headerAlign: 'center',
      slots: ({ row }) => <SkAppOperations
        api={rFormBtns}
        excludes={['increase']}
        onU={() => router.push(`/system/form/edit/${row.id}`)}
        onD={() => dForm(row.id).then(r)}
        onR={() => router.push(`/system/form/detail/${row.id}`)}
      >
      </SkAppOperations>,
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

const deR = debounce(r, 300)
watch(() => queryState.data, deR, { deep: true })
watch(() => tableState.pagination, r, { deep: true, immediate: true })
function r () {
  tableState.columns = [
    // ...res.columns as Col[],
    ...tableState._columns,
  ]
  return rFormList(tableState.pagination, queryState.data.formName).then(res => {
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


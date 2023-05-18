<script lang="tsx" setup>
import { computed, reactive, watch } from 'vue'
import { 
  rConstants as rApi,
  cuConstant as cuApi,
  dConstants as dApi,
  rConstantBtns as rBtnsApi,
} from '@skzz-platform/api/system/constant'
import { SkAppDialog, SkAppOperations, SkAppTablesV1, __SkAppTablesV1, SkAppQueryForm, __SkAppQueryForm } from '@skzz/platform'
import { setData, VkDuplexCalc } from '@vunk/core'
import CUForm from './cu-form/index.vue'
import { Row } from './types'
import { ElButton } from 'element-plus'
import { SkIncreaseButton } from '@skzz-platform/components/increase-button'

type Col = __SkAppTablesV1.Column<Row>


const queryItems:__SkAppQueryForm.CoreFormItem<keyof Row>[] = [
  {
    prop: 'label',
    templateType: 'VkfInput',
    label: '显示名称',
  },

]
const queryState = reactive({
  data: {} as Partial<Row>,
})

const tableState = reactive({
  data: [] as Row[],
  _columns: [
    {
      prop: 'label',
      label: '显示名称',
    },
    {
      prop: 'value',
      label: '值',
    },
    {
      prop: 'memo',
      label: '备注',
    },


    {
      prop: undefined,
      label: '操作',
      slots: ({ row }) => <SkAppOperations
        api={ rBtnsApi }
        excludes={['increase', 'search']}
        onU={ () => preuI(row) }
        onD={ () => d([row.id])  }

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
watch(() => queryState.data, r, { deep: true })
function r () {
  return rApi(queryState.data, tableState.pagination).then(res => {
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
function d (ids: string[]) {
  dApi(ids).then(() => {
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
  cuApi(cuData.value).then(() => {
    r()
    cuState.type = ''
  })
}





</script>
<template>
  <page-x>
    <VkDuplexCalc class="pa-page h-full">
      <template #one>
        <SkAppQueryForm
          :formItems="queryItems"
          :data="queryState.data"
          @setData="setData(queryState.data, $event)"
        >
        <template #options>
          <SkIncreaseButton
            :btns="rBtnsApi"
            @click="precI"
          >
          </SkIncreaseButton>
        </template>
        </SkAppQueryForm>
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

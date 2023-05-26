<script lang="tsx" setup>
import PageX from '_c/PageX/index.vue'
import { 
  SkAppTables, __SkAppTables, 
  SkAppQueryForm, __SkAppQueryForm, 
  SkAppOperations,
  Pagination,
} from '@skzz/platform'
import { NormalObject, setData, VkDuplexCalc } from '@vunk/core'
import { reactive, ref, watch } from 'vue'
import { 
  cuButton as cuApi,
  dButtons as dApi,
  rButtons as rApi, 
  rButtonBtns,
} from '@skzz-platform/api/system/button'
import { genColumn } from '@skzz-platform/shared/utils-data'
import CuForm from './cu-form/index.vue'
import { SkAppDialog } from '@skzz-platform/components/app-dialog'
import { Row } from './types'
import { SkIncreaseButton } from '@skzz-platform/components/increase-button'

/* query */
const queryItems: __SkAppQueryForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'label',
    label: '名称',
  },
]
const queryData = ref({} as NormalObject)

const pagination = ref<Pagination>({
  pageSize: 10,
  start: 0,
})
watch(pagination, r, { deep: true , immediate: true })
watch(queryData, r, { deep: true  })
/* query end */


const tableState = reactive({
  _columns: [] as __SkAppTables.Column[],
  columns: [] as  __SkAppTables.Column[],
  data: [] as Row[],
  total: 0,
})

const cuIState = reactive({
  visible: false,
  formData: {} as Partial<Row>,
  title: '新增应用',
})

const operationsCol: __SkAppTables.Column = {
  title: '操作',
  key: 'operations',
  width: 100,
  flexGrow: 1,
  align: 'center',
  cellRenderer: ({ rowData }) => <SkAppOperations
    api={rButtonBtns}
    onD={ () => { d([rowData.id]) } }
    onU={ () => { preuI(rowData) } }
  ></SkAppOperations>,
} 
const overwriteCols = {
  // icon: {
  //   dataKey: 'icon',
  //   key: 'icon',
  //   width: 60,
  //   align: 'center',
  //   title: '图标',
  //   cellRenderer: ({ cellData }) => <SkAppIcon
  //     icon={cellData} 
  //   ></SkAppIcon>,
  // },
  icon: null,
  label: {
    dataKey: 'label',
    width: 200,
    align: 'center',
    title: '名称',
    key: 'label',
    flexGrow: 1,
  },
  name: null,
  isSys: null,

} as Record<keyof Row, __SkAppTables.Column|null>
function r () {
  rApi(queryData.value, pagination.value).then(res => {
    if (!tableState.columns.length) {

      tableState.columns = [
        ...tableState._columns,
        ...res.columns.reduce((a, c) => {
          if (Reflect.has(overwriteCols, c.prop)) {
            const oCol = overwriteCols[c.prop as keyof Row]
            oCol && a.push(oCol)
          } else if (c.type === 'selection') {

  
          } else if (c.type === 'button') {
            a.push(operationsCol)
          } else {
            a.push(genColumn(c))
          }
          return a
        }, [] as __SkAppTables.Column[]),
      ]
    }
    tableState.data = res.rows
    tableState.total = res.total
  })
}
function d (ids: string[]) {
  dApi(ids).then(r)
}
function precI () {
  cuIState.visible = true
  cuIState.formData = {}
  cuIState.title = '新增'
}
function preuI (data: Row) {
  cuIState.visible = true
  cuIState.formData = {...data}
  cuIState.title = '修改'
}
function cuI () {
  cuApi(cuIState.formData as Row).then(r).then(() => {
    cuIState.visible = false
  })
}

</script>
<template>
  <PageX>
    <VkDuplexCalc class="gap-main-x">
      <template #one>
        <SkAppQueryForm 
          :data="queryData" 
          :form-items="queryItems" 
          @setData="setData(queryData, $event)"
          @enter="r"
        >
          <template #options>
            <SkIncreaseButton 
              v-button:increase="rButtonBtns()"
              @click="precI"
            >
              新增
            </SkIncreaseButton>
          </template>
        </SkAppQueryForm>
      </template>

      <SkAppTables 
        v-bind="tableState" 
        v-model:start="pagination.start"
        v-model:pageSize="pagination.pageSize"
        class="h-100%"
      />
    </VkDuplexCalc>

    <SkAppDialog
      v-model="cuIState.visible"
      :title="cuIState.title"
    >
      <CuForm
        :data="cuIState.formData"
        @setData="setData(cuIState.formData, $event)"
        @submit="cuI"
      />
    </SkAppDialog>
  </PageX>
</template>

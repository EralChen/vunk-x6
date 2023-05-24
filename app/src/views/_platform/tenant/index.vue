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
import { cuTenant, dTenants, rTenants, rTenantBtns } from '@skzz-platform/api/platform/tenant'
import { genColumns } from '@skzz-platform/shared/utils-data'
import CuForm from './cu-form/index.vue'
import { SkAppDialog } from '@skzz-platform/components/app-dialog'
import { Row } from './types'
import { SkIncreaseButton } from '@skzz-platform/components/increase-button'



/* query */
const queryItems: __SkAppQueryForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '租户名称',
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
  columns: [] as  __SkAppTables.Column[],
  data: [] as Row[],
  total: 0,
})

const cuIState = reactive({
  type: '' as 'u' | 'c' | '',
  visible: false,
  formData: {} as Partial<Row>,
  title: '新增角色',
})

const operationsCol: __SkAppTables.Column = {
  title: '操作',
  key: 'operations',
  width: 150,
  flexGrow: 1,
  align: 'center',
  cellRenderer: ({ rowData }) => <SkAppOperations
    api={rTenantBtns}
    onD={ () => { d([rowData.id]) } }
    onU={ () => { preuI(rowData) } }
  ></SkAppOperations>,
} 
const propToCol = {
  foundTime: {
    cellRenderer ({ cellData }) {
      const data = cellData as string
      return <span>{data.split('.')[0]}</span>
    },
  },
} as Record<keyof Row, Partial<__SkAppTables.Column> | null>

const typeToCol: Record<string, __SkAppTables.Column> = {
  button: operationsCol,
}

function r () {
  rTenants(queryData.value, pagination.value).then(res => {
    if (!tableState.columns.length) {
      tableState.columns = genColumns(
        res.columns, 
        propToCol,
        typeToCol,
      )

      tableState.columns.push(operationsCol)
    }
    tableState.data = res.rows
    tableState.total = res.total
  })
}
function d (ids: string[]) {
  dTenants(ids).then(r)
}
function precI () {
  cuIState.type = 'c'
  cuIState.visible = true
  cuIState.formData = {}
  cuIState.title = '新增租户'
}
function preuI (data: Row) {
  cuIState.type = 'u'
  cuIState.visible = true
  cuIState.formData = {...data}
  cuIState.title = '修改租户'
}
function cuI () {
  cuTenant(cuIState.formData as Row).then(r).then(() => {
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
              :btns="rTenantBtns()"
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
      @close="cuIState.type = ''"
    >
      <CuForm
        :type="cuIState.type"
        :data="cuIState.formData"
        @setData="setData(cuIState.formData, $event)"
        @submit="cuI"
      />
    </SkAppDialog>
  </PageX>
</template>

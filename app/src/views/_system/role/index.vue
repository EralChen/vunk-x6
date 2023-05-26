<script lang="tsx" setup>
import PageX from '_c/PageX/index.vue'
import { 
  SkAppTables, __SkAppTables, 
  SkAppQueryForm, __SkAppQueryForm, 
  SkAppOperations,
  Pagination,
  SkAppDialog,
} from '@skzz/platform'
import { ApiReturnType, NormalObject, setData, VkDuplexCalc } from '@vunk/core'
import { reactive, ref, watch } from 'vue'
import { rRoles, dRoles, cuRole, rRoleBtns } from '@skzz-platform/api/system/role'
import { genColumn } from '@skzz-platform/shared/utils-data'
import FormVue, { Data as FormVueData } from './form.vue'
import { SkIncreaseButton } from '@skzz-platform/components/increase-button'
type Res = ApiReturnType<typeof rRoles>

/* query */
const queryItems: __SkAppQueryForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '角色名称',
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
  _columns: [
  ] as  __SkAppTables.Column[],
  columns: [] as  __SkAppTables.Column[],
  data: [] as Res['rows'],
  total: 0,
})

const cuIState = reactive({
  type: '' as 'c' | 'u' | '',
  formData: {} as Partial<FormVueData>,
})

const operationsCol: __SkAppTables.Column = {
  title: '操作',
  key: 'operations',
  width: 150,
  flexGrow: 1,
  align: 'center',
  cellRenderer: ({ rowData }) => <SkAppOperations
    api={rRoleBtns}
    onD={ () => { d([rowData.id]) } }
    onU={ () => { preuI(rowData) } }
  ></SkAppOperations>,
} 

const colsMap = {
  isSys: {

    key: 'isSys',
    dataKey: 'isSys',
    title: '系统保留',
    cellRenderer: ({cellData}) => {
      return <span>{cellData === 1 ? '是' : '否'}</span> 
    },

  },

} as Record<string, Partial<__SkAppTables.Column>>

function r () {
  rRoles(queryData.value, pagination.value).then(res => {
    if (!tableState.columns.length) {
      const remoteCols = res.columns.reduce((a, c) => {
        if (colsMap[c.prop]) {
          a.push({
            ...genColumn(c),
            ...colsMap[c.prop],
          })
          return a
        }

        if (c.type === 'selection') {

  
        } else if (c.type === 'button') {
          a.push(operationsCol)
        } else {
          a.push(genColumn(c))
        }
  
        return a
      }, [] as __SkAppTables.Column[])
      tableState.columns = [...tableState._columns, ...remoteCols]
  
    }
    tableState.data = res.rows
    tableState.total = res.total
  })
}
function d (ids: string[]) {
  dRoles(ids).then(r)
}
function precI () {
  cuIState.type = 'c'
  cuIState.formData = {}
}
function preuI (data: FormVueData) {
  cuIState.type = 'u'
  cuIState.formData = {...data}
}
function cuI () {
  cuRole(cuIState.formData).then(r).then(() => {
    cuIState.type = ''
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
              :btns="rRoleBtns()"
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
      :model-value="!!cuIState.type"
      :title="cuIState.type === 'u' ? '编辑' : '新增'"
      @update:modelValue="cuIState.type = ''"
    >
      <FormVue
        :data="cuIState.formData"
        @setData="setData(cuIState.formData, $event)"
        @submit="cuI"
      />
    </SkAppDialog>
  </PageX>
</template>



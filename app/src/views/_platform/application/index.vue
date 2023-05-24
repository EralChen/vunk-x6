<script lang="tsx" setup>
import PageX from '_c/PageX/index.vue'
import { 
  SkAppTables, __SkAppTables, 
  SkAppQueryForm, __SkAppQueryForm, 
  SkAppOperations,
  Pagination,
} from '@skzz/platform'
import { NormalObject, setData, VkDuplexCalc } from '@vunk/core'
import { computed, reactive, ref, watch } from 'vue'
import { cuApplication, rApplicationBtns, dApplications, rApplications, BoundApplication, cBoundApplications, rBoundApplications, dBoundApplications } from '@skzz-platform/api/platform/application'
import { genColumns } from '@skzz-platform/shared/utils-data'
import CuForm from './cu-form/index.vue'
import { SkAppDialog } from '@skzz-platform/components/app-dialog'
import { Row } from './types'
import { SkTenantTablesSelect } from '@skzz-platform/components/tenant-tables-select'
import { Tenant } from '@skzz-platform/api/platform/tenant'
import { ElButton, ElPopconfirm } from 'element-plus'
import { useUpdateApplictionEvent } from '@/composables'
import { SkIncreaseButton } from '@skzz-platform/components/increase-button'
import CAdministratorForm from './c-administrator-form/index.vue'

const  { dispath } = useUpdateApplictionEvent()

/* query */
const queryItems: __SkAppQueryForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'name',
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
  columns: [] as  __SkAppTables.Column[],
  data: [] as Row[],
  total: 0,
})

const cuIState = reactive({
  visible: false,
  formData: {} as Partial<Row>,
  title: '新增应用',
})

/**
 * 绑定第一步, 选择租户
 */
const bindState = reactive({
  current: {} as Partial<Row>,
  title: '绑定租户',
  data: [] as Partial<Tenant>[],
})
/**
 * 绑定第二步, 分配应用管理员
 */
const bind2State = reactive({
  title: '分配应用管理员',
  visible: false,
  current: {} as Partial<Tenant>,
  postData: {} as Partial<BoundApplication>,
})

const bindCols = computed< __SkAppTables.Column[]>(() => [
  {
    key: 'operation',
    title: '操作',
    width: 100,
    align: 'center',
    cellRenderer: ({ rowData }) => {
   
      return bindState.data.some(item => {
        return item.tenantId === rowData.tenantId
      }) 
        ? <ElPopconfirm
          title="确定解绑吗？"
          onConfirm={ () => { unbind({
            tenantId: rowData.tenantId,
            applicationId: bindState.current.applicationId,
          }) } }
          v-slots={
            {
              reference: () => <ElButton
                type="danger"
                size='small'
              >
              解绑
              </ElButton>,
            }
          }
        >
        
        </ElPopconfirm>

        : <ElButton
          type="primary"
          size='small'
          onClick={() => prebind2(rowData)}
        >
          绑定  
        </ElButton>
    },
  },
])  

const operationsCol: __SkAppTables.Column = {
  title: '操作',
  key: 'operations',
  width: 150,
  flexGrow: 1,
  align: 'center',
  cellRenderer: ({ rowData }) => <SkAppOperations
    api={rApplicationBtns}
    onD={ () => { d([rowData.id]) } }
    onU={ () => { preuI(rowData) } }
    onClick={ (e) => {
      if (e === 'bind') {
        prebind(rowData)
      }
    }}
  ></SkAppOperations>,
} 

const propToCol = {
  client: null,
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
  rApplications(queryData.value, pagination.value).then(res => {
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
  dApplications(ids).then(r)
}
function precI () {
  cuIState.visible = true
  cuIState.formData = {}
  cuIState.title = '新增应用'
}
function preuI (data: Row) {
  cuIState.visible = true
  cuIState.formData = {...data}
  cuIState.title = '修改应用'
}
function cuI () {
  cuApplication(cuIState.formData as Row).then(r).then(() => {
    cuIState.visible = false
  })
}

function rBinds ()  {
  if (!bindState.current.applicationId) return
  rBoundApplications(bindState.current.applicationId).then(res => {
    bindState.data = res.rows
  })
}
function prebind (row: Row) {
  bindState.current = row
  bindState.title = '绑定租户'
  bind2State.postData.applicationId = row.applicationId
  return rBinds()
}
function prebind2 (row: Tenant) {
  bind2State.visible = true
  bind2State.current = row
  bind2State.postData.tenantId = row.tenantId
}

function bind (ba: Partial<BoundApplication>) {
  cBoundApplications([ba])
    .then(rBinds)
    .then(dispath)
    .then(() => {
      bind2State.visible = false
    })
}
function unbind (ba: Partial<BoundApplication>) {
  dBoundApplications([ba])
    .then(rBinds)
    .then(dispath)
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
            <!-- <ElButton type="primary" @click="r">查询</ElButton> -->

            <SkIncreaseButton 
              :btns="rApplicationBtns()"
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

    <SkAppDialog 
      :model-value="!!bindState.current.applicationId"
      :title="bindState.title"
      @update:modelValue="bindState.current = {}"
    >
      <SkTenantTablesSelect
        v-model="bindState.data"
        :columns="bindCols"
        :readonly="true"
        class="h-50vh"
      />
    </SkAppDialog>

    <SkAppDialog
      v-model="bind2State.visible"
      :title="bind2State.title"
      :modal="false"
    >
      <CAdministratorForm
        :data="bind2State.postData"
        @setData="setData(bind2State.postData, $event)"
        @submit="bind(bind2State.postData)"
      />
    </SkAppDialog>
  </PageX>
</template>

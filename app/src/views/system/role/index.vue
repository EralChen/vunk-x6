<script lang="tsx" setup>
import PageX from '_c/PageX/index.vue'
import { 
  SkAppTables, __SkAppTables, 
  SkAppQueryForm, __SkAppQueryForm, 
  SkAppOperations,
  Pagination,
} from '@skzz/platform'
import { ApiReturnType, NormalObject, setData, VkDuplexCalc } from '@vunk/core'
import { reactive, ref, watch } from 'vue'
import { rRoles, dRoles } from '@skzz-platform/api/system/role'
import { genColumn } from '@skzz-platform/shared/utils-data'
import FormVue from './form.vue'

type Res = ApiReturnType<typeof rRoles>

const queryItems: __SkAppQueryForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '姓名',
  },
]
const queryData = ref({} as NormalObject)
const pagination = ref<Pagination>({
  pageSize: 10,
  start: 0,
})
const tableState = reactive({
  columns: [] as  __SkAppTables.Column[],
  data: [] as Res['rows'],
  total: 0,
})
watch(pagination, r, { deep: true , immediate: true })
// watch(formData, r, { deep: true , immediate: true })

const cuIState = reactive({
  visible: false,
  formData: {} as NormalObject,
})

function r () {
  rRoles(queryData.value, pagination.value).then(res => {
    tableState.columns = res.columns.reduce((a, c) => {
      if (c.type === 'selection') {

  
      } else if (c.type === 'button') {
        a.push({
          title: '操作',
          width: 150,
          flexGrow: 1,
          align: 'center',
          cellRenderer: ({ rowData }) => <SkAppOperations
            modules={['d']}
            onD={ () => { d([rowData.id]) } }
          ></SkAppOperations>,
        })

      } else {
        a.push(genColumn(c))
      }
  
      return a
    }, [] as __SkAppTables.Column[])

    tableState.data = res.rows
    tableState.total = res.total
  })
}
function d (ids: string[]) {
  dRoles(ids).then(r)
}
function prec () {
  cuIState.visible = true
  cuIState.formData = {}
}

</script>
<template>
  <PageX>
    <VkDuplexCalc class="plr-page ptb-main-ptb">
      <template #one>
        <SkAppQueryForm 
          :data="queryData" 
          @setData="setData(queryData, $event)" 
          :formItems="queryItems"
        >
          <template #options>
            <ElButton type="primary" @click="r">查询</ElButton>
            <ElButton type="primary" 
              @click="prec"
            >新增</ElButton>
            
          </template>
        </SkAppQueryForm>
      </template>

      <SkAppTables 
        class="h-100%" 
        v-bind="tableState"
        v-model:start="pagination.start"
        v-model:pageSize="pagination.pageSize"
      >
      </SkAppTables>
    </VkDuplexCalc>

    <ElDialog v-model="cuIState.visible">
      <FormVue
        :data="cuIState.formData"
        @setData="setData(cuIState.formData, $event)"
      ></FormVue>
    </ElDialog>

  </PageX>
</template>

<script lang="tsx" setup>
import PageX from '_c/PageX/index.vue'
import { 
  SkAppCard, SkCheckTags,
  SkAppTables, __SkAppTables, 
  SkAppQueryForm, __SkAppQueryForm, 
  SkAppOperations,
  Pagination,
} from '@skzz/platform'
import { ApiReturnType, NormalObject, setData, VkDuplexCalc } from '@vunk/core'
import { reactive, ref, watch } from 'vue'
import { FixedDir } from 'element-plus/es/components/table-v2/src/constants'
import { rRoles } from '@skzz-platform/api/system/role'
type Res = ApiReturnType<typeof rRoles>

const formItems: __SkAppQueryForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '姓名',
  },
]

const colSource: __SkAppTables.Column[] = [
  {
    type: 'index',
    width: 50,
  },
  {
    key: 'name',
    dataKey: 'name',
    width: 100,
    title: '姓名',
  },
  {
    key: 'operations',
    title: '操作',
    width: 260,
    fixed: FixedDir.RIGHT,
    cellRenderer: () => {
      return <SkAppOperations 
        modules={[ 'r', 'u', 'd']}

      ></SkAppOperations>
    },
  },
]

const formData = ref({} as NormalObject)
const pagination = ref<Pagination>({
  pageSize: 10,
  start: 0,
})
const tableState = reactive({
  data: [] as Res['rows'],
  total: 0,
})

watch(pagination, r, { deep: true , immediate: true })
// watch(formData, r, { deep: true , immediate: true })

function r () {
  rRoles(formData.value, pagination.value).then(res => {
    tableState.data = res.rows
    tableState.total = res.total
  })
}
</script>
<template>
  <PageX>
    <VkDuplexCalc class="plr-page ptb-main-ptb">
      <template #one>
        <SkAppQueryForm 
          :data="formData" 
          @setData="setData(formData, $event)" 
          :formItems="formItems"
        >
          <template #options>
            <ElButton type="primary" @click="r">查询</ElButton>
            <ElButton type="primary">新增</ElButton>
            
          </template>
        </SkAppQueryForm>
        <!-- <div sk-flex="row-between-center" ptb-page> -->
          <!-- <SkCheckTags v-model="formData.type" :options="typeOptions"></SkCheckTags> -->
         
        <!-- </div> -->

      </template>

      <SkAppTables 
        class="h-100%" 
        :data="tableState.data"
        :columns="colSource"
        :total="tableState.total"

        v-model:start="pagination.start"
        v-model:pageSize="pagination.pageSize"
      >
      </SkAppTables>
    </VkDuplexCalc>
  </PageX>
</template>

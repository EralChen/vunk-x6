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
import { rRoles } from '@skzz-platform/api/system/role'
import { genColumn } from '@skzz-platform/shared/utils-data'
type Res = ApiReturnType<typeof rRoles>

const formItems: __SkAppQueryForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '姓名',
  },
]


const formData = ref({} as NormalObject)
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

function r () {
  rRoles(formData.value, pagination.value).then(res => {
    tableState.columns = res.columns.reduce((a, c) => {
      if (c.type === 'selection') {

        return a
      } else {
        a.push(genColumn(c))
      }
  
      return a
    }, [] as __SkAppTables.Column[])
    console.log(tableState.columns, 'tableState.columns')
    
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
        v-bind="tableState"
        v-model:start="pagination.start"
        v-model:pageSize="pagination.pageSize"
      >
      </SkAppTables>
    </VkDuplexCalc>
  </PageX>
</template>

<template>
  <!-- <ElFormItem :label="props.label"> -->
    <!-- <SkTableSelectTags :closable="true" @click="doBind()" v-model="showData" :prop="{ id: idKey }"></SkTableSelectTags> -->
  <!-- </ElFormItem> -->
  <div sk-flex="row-end" class="mb">
    <ElButton type="primary" size="small" @click="doShow">新增</ElButton>
  </div>

  <ElDialog v-model="showDialog" :title="`选择字段`" :appendToBody="true">
    <SkAppTables :oidField="idKey" class="h-30em" v-model="model" :columns="tableState.columns" :data="tableState.data" :single="true"
      :total="tableState.total" v-model:pageSize="tableState.pagination.pageSize"
      v-model:start="tableState.pagination.start"></SkAppTables>
      <template #footer>
        <ElButton @click="add" type="primary">确定</ElButton>
      </template>
  </ElDialog>
</template>

<script setup lang="tsx">
import { reactive, watch } from 'vue'
import { propsOp } from './ctx'
import { SkAppTables, __SkAppTables } from '@skzz-platform/components/app-tables'
import { Pagination } from '@skzz/platform'
// import { SkTableSelectTags } from '@skzz/platform'
import { FIRS, rFormDetail } from '@skzz-platform/api/system/form'
import { useVModel } from '@vueuse/core'


const idKey = 'prop'
const props = defineProps(propsOp)

const emit = defineEmits(['update:modelValue', 'update:show', 'add'])
const showDialog = useVModel(props, 'show', emit)
const model = useVModel(props, 'modelValue', emit) as any

const tableState = reactive({
  data: [] as any,
  columns: [
    {
      type: 'selection',
      width: 60,
      align: 'center',
      key: 'selection',
    },
    {
      title: '字段名称',
      dataKey: 'label',
      key: 'label',
      width: 200,
      flexGrow: 1,
    },
    {
      title: '字段类型',
      dataKey: 'templateType',
      key: 'templateType',
      width: 200,
      flexGrow: 1,
    },
  ] as __SkAppTables.Column[],

  pagination: {
    pageSize: 10,
    start: 0,
  } as Pagination,

  total: 0,
})

function doShow () {
  showDialog.value = true
}
function add () {
  emit('add', model.value)
}

// const showData = computed({
//   get: () => model.value[idKey] ? [model.value] : [],
//   set: () => {
//     model.value = {}
//   },
// })

// 假的分页
let tempData: FIRS<string>[] | null = null
watch(() => tableState.pagination, r, { deep: true, immediate: true })
async function r () {
  if (!tempData && props.formId) {
    const res = await rFormDetail(props.formId)
    tempData = res.form || []
    tableState.total = tempData.length
  }
  tableState.data = getData()
}

function getData () {
  return tempData?.slice(tableState.pagination.start, tableState.pagination.start + tableState.pagination.pageSize) || []
}

</script>

<style lang="scss" scoped></style>
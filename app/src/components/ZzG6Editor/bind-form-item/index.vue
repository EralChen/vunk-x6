<template>
  <ElFormItem :label="props.label">
    <SkTableSelectTags :closable="true" @click="doBind()" v-model="model" :prop="{ id: idKey }"></SkTableSelectTags>
  </ElFormItem>

  <ElDialog v-model="showDialog" :title="`绑定'${title}'表单`">
    <SkAppTables :oidField="idKey" class="h-30em" :modelValue="modelValue" :columns="tableState.columns" :data="tableState.data"
      :total="tableState.total" @update:modelValue="$emit('update:modelValue', $event)"
      v-model:pageSize="tableState.pagination.pageSize" v-model:start="tableState.pagination.start"></SkAppTables>
  </ElDialog>
</template>

<script setup lang="tsx">
import { computed, reactive, ref, watch } from 'vue'
import { propsOp } from './ctx'
import { SkAppTables, __SkAppTables } from '@skzz-platform/components/app-tables'
import { Pagination } from '@skzz/platform'
import { useComputedReadonly } from '@vunk/form'
import { ElOption, ElSelect } from 'element-plus'
import { SkTableSelectTags } from '@skzz/platform'
import { FIRS, rFormDetail } from '@skzz-platform/api/system/form'


const idKey = 'prop'
const props = defineProps(propsOp)
// el-form 表单向下注入的disabled的内容
const emit = defineEmits(['update:modelValue'])
const title = ref('')
const readonly = useComputedReadonly({
  readonly: undefined,
})
const showDialog = ref(false)
const model = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  },
})


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
    {
      title: '状态',
      dataKey: 'name',
      key: 'name',
      width: 200,
      flexGrow: 1,
      cellRenderer: ({rowData}) => {
        return <ElSelect disabled={readonly.value} v-model={rowData.status}>
          <ElOption label="可编辑" value="1"></ElOption>
          <ElOption label="仅显示" value="0"></ElOption>
        </ElSelect>
      },
    },
  ] as __SkAppTables.Column[],

  pagination: {
    pageSize: 10,
    start: 0,
  } as Pagination,

  total: 0,
})
let tempData: FIRS<string>[] | null = null
watch(() => tableState.pagination, r, { deep: true, immediate: true })  
async function r () {
  if (!tempData) {
    const res = await rFormDetail(props.formId)
    tempData = res.form
    title.value = res.formName
    tableState.total = tempData.length
  }
  tableState.data = getData()
}
const doBind = () => {
  showDialog.value = true
}
function getData () {
  return tempData?.slice(tableState.pagination.start, tableState.pagination.start + tableState.pagination.pageSize) || []
}

</script>

<style lang="scss" scoped></style>
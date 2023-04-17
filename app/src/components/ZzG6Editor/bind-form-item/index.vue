<template>
  <ElFormItem :label="props.label">
    <SkTableSelectTags :closable="true" @click="doBind()" v-model="model" :prop="{ label: 'name' }"></SkTableSelectTags>
  </ElFormItem>

  <ElDialog v-model="showDialog" title="绑定表单">
    <SkAppTables class="h-30em" :modelValue="modelValue" :columns="tableState.columns" :data="tableState.data"
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


const props = defineProps(propsOp)
// el-form 表单向下注入的disabled的内容
const emit = defineEmits(['update:modelValue'])
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
const doBind = () => {
  showDialog.value = true
}

const tableState = reactive({
  data: [],
  columns: [
    {
      type: 'selection',
      width: 60,
      align: 'center',
      key: 'selection',
    },
    {
      title: '字段名称',
      dataKey: 'code',
      key: 'code',
      width: 200,
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
    pageSize: 8,
    start: 0,
  } as Pagination,

  total: 0,
})

watch(() => tableState.pagination, r, { deep: true, immediate: true })
function r () {
  // rUsers(queryState.data, tableState.pagination).then(res => {
  //   tableState.data = res.rows
  //   tableState.total = res.total
  // })
  tableState.data = [
    {
      id: '1',
      code: '111',
      name: '222',
      status: '1',
    } as any,
    {
      id: '2',
      code: '111',
      name: '222',
      status: '',
    } as any,
    {
      id: '3',
      code: '111',
      name: '222',
      status: '0',
    } as any,
  ] as any
}

</script>

<style lang="scss" scoped></style>
<template>
  <ElFormItem :label="props.label">
    <div>
      <ElButton type="primary" size="small" @click="doBind">绑定</ElButton>
      <div> {{ props.modelValue }}
      </div>
    </div>
  </ElFormItem>

  <ElDialog v-model="showDialog" title="绑定表单">
    <SkAppTables class="h-30em" :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)"
      :columns="tableState.columns" :data="tableState.data" :total="tableState.total"
      v-model:start="tableState.pagination.start" v-model:pageSize="tableState.pagination.pageSize"></SkAppTables>
  </ElDialog>
</template>

<script setup lang="ts">
import { reactive, ref, useAttrs, watch } from 'vue'
import { propsOp, emits } from './ctx'
import { useFormDisabled } from 'element-plus'
import { SkAppTables, __SkAppTables } from '@skzz-platform/components/app-tables'
import { Pagination } from '@skzz/platform'

const props = defineProps(propsOp)

// el-form 表单向下注入的disabled的内容
const formDisabled = useFormDisabled()
const showDialog = ref(false)
const doBind = () => {
  console.log(props.modelValue)
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
      title: '表单名称',
      dataKey: 'code',
      key: 'code',
      width: 200,
    },
    {
      title: '表单编号',
      dataKey: 'name',
      key: 'name',
      width: 200,
      flexGrow: 1,
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
    } as any,
    {
      id: '2',
      code: '111',
      name: '222',
    } as any,
    {
      id: '3',
      code: '111',
      name: '222',
    } as any,
  ] as any
}

</script>

<style lang="scss" scoped></style>
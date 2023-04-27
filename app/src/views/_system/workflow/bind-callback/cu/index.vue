<template>
  <ElFormItem label="通知人">
    <BindUser v-model="showBind" :closable="true" :has-bind="false" v-model:data="bindData" v-model:show-data="bindData">
    </BindUser>
  </ElFormItem>
  <ElFormItem label="表单字段">
    <div class="w-100%">
      <BindFormItem v-model:show="showBindForm" :form-id="formId" v-model="bindFormData" @add="addTableData">
      </BindFormItem>
      <SkAppTablesV1 class="h-20vh" layout="" :defaultExpandAll="true" flex-1 :rowKey="'menuId'"
        :columns="tableState.columns" :data="tableState.data" v-model:page-size="tableState.pagination.pageSize"
        v-model:start="tableState.pagination.start">
      </SkAppTablesV1>
    </div>

  </ElFormItem>
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue'
import BindUser from '../../bind-user/index.vue'
import { SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { ElButton, ElInput } from 'element-plus'
import BindFormItem from '../bind-form-item/index.vue'

type Row = any
type Col = __SkAppTablesV1.Column<Row>

const props = defineProps({
  formId: {
    type: String,
    default: '',
  },
})

const showBindForm = ref(false)
const bindFormData = ref({})

const tableState = reactive({
  data: [
  ] as Row[],
  columns: [
    {
      prop: 'prop',
      label: '字段',
      minWidth: '10%',
      align: 'center',
      headerAlign: 'center',
      slots: ({ row }) => <span>
        {row.prop.label}
      </span>,
    },
    {
      prop: 'value',
      label: '值',
      minWidth: '10%',
      align: 'center',
      headerAlign: 'center',
      slots: ({ row }) => <ElInput v-model={row.value}></ElInput>,
    },
    {
      prop: undefined,
      label: '操作',
      minWidth: '3%',
      align: 'center',
      headerAlign: 'center',
      slots: ({row}) => <ElButton type='danger' size='small' onClick={() => del(row)}>删除</ElButton>,
    },
  ] as Col[],
  query: {},
  pagination: {
    pageSize: 10,
    start: 0,
  },
})


const showBind = ref(false)
const bindData = ref([])


function addTableData (e: any) {
  tableState.data.push({
    id: Math.random(),
    prop: e,
    value: '',
  })
  showBindForm.value = false
  bindFormData.value = {}
}

function del (row: any) {
  tableState.data.splice(tableState.data.findIndex(item => item.id = row.id), 1)
}
</script>

<style lang="scss" scoped></style>
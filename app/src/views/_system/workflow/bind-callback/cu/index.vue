<template>
  <ElFormItem label="通知人">
    <BindUser v-model="showBind" :closable="true" :has-bind="false" v-model:data="bindData" @update:data="doEmit" v-model:show-data="bindData" @update:show-data="doEmit" />
  </ElFormItem>
  <ElFormItem label="表单字段">
    <div class="w-100%">
      <BindFormItem v-model:show="showBindForm" :form-id="formId" v-model="bindFormData" @add="addTableData" />
      
      <SkAppTablesV1 class="h-20vh" layout="" :defaultExpandAll="true" flex-1 :rowKey="'menuId'"
        :columns="tableState.columns" :data="tableState.data" v-model:page-size="tableState.pagination.pageSize"
        v-model:start="tableState.pagination.start">
      </SkAppTablesV1>
    </div>

  </ElFormItem>
</template>

<script setup lang="tsx">
import { PropType, reactive, ref, watch } from 'vue'
import BindUser from '../../bind-user/index.vue'
import { SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { ElButton, ElInput } from 'element-plus'
import BindFormItem from '../bind-form-item/index.vue'
import { FlowCallbackItem } from '@skzz-platform/api/system/workflow/callback/types'
import { User } from '@skzz-platform/api/system/user'

type Row = FlowCallbackItem['updateFormData']
type Col = __SkAppTablesV1.Column<Row[0]>

const props = defineProps({
  formId: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Object as PropType<FlowCallbackItem>,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:modelValue'])

// 被通知人的回调绑定
const showBind = ref(false)
const bindData = ref<User[]>([])
// 表单字段的回调绑定
const showBindForm = ref(false)
const bindFormData = ref({})

const tableState = reactive({
  data: [] as Row,
  columns: [
    {
      prop: 'prop',
      label: '字段',
      minWidth: '10%',
      align: 'center',
      headerAlign: 'center',
      slots: ({ row }) => <span>
        {row.label}
      </span>,
    },
    {
      prop: 'value',
      label: '值',
      minWidth: '10%',
      align: 'center',
      headerAlign: 'center',
      slots: ({ row }) => <ElInput v-model={row.value} onChange={() => doEmit()}></ElInput>,
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




watch(() => props.modelValue, v => {
  if (v && v.updateFormData) {
    tableState.data = v.updateFormData.map(item => ({
      ...item,
    }))
  }
  if (v && v.notify) {
    bindData.value = v.notify.map(item => ({
      id: item.operId,
      name: item.operName,
    }) as User)
  }
}, { immediate: true, deep: true})

function addTableData (e: any) {
  tableState.data.push({
    id: Math.random(),
    prop: e.prop,
    label: e.label,
    value: '',
  })
  showBindForm.value = false
  bindFormData.value = {}
  doEmit()
}

function del (row: any) {
  tableState.data.splice(tableState.data.findIndex(item => item.id = row.id), 1)
  doEmit()
}


function doEmit () {
  emit('update:modelValue', {
    updateFormData: tableState.data,
    notify: bindData.value.map(item => ({operId: item.id, operName: item.name})),
  })
}
</script>

<style lang="scss" scoped></style>
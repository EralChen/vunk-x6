<template>
  <PageX>
    <VkDuplexCalc class="pa-page h-full">
      <template #one>
        <!-- <SkAppQueryForm :fixes="2" :data="formData" @setData="setData(formData, $event)" :formItems="queryItems">
          </SkAppQueryForm> -->
      </template>
      <SkAppTablesV1
        v-model:page-size="tableState.pagination.pageSize"
        v-model:start="tableState.pagination.start"
        :default-expand-all="true"
        flex-1
        :row-key="'menuId'"
        :columns="tableState.columns"
        :data="tableState.data"
        :total="tableState.total"
      />
    </VkDuplexCalc>
  </PageX>
</template>

<script lang="tsx" setup>
import PageX from '_c/PageX/index.vue'
import {
  SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { VkDuplexCalc } from '@vunk/core'
import { reactive, watch } from 'vue'
import { MessageStatus } from './ctx'
import { rMessageList } from '@skzz-platform/api/system/message'
import { Row } from './types'
type Col = __SkAppTablesV1.Column<Row>

const tableState = reactive({
  data: [] as Row[],
  _columns: [
    {
      prop: 'tplId',
      label: '模板ID',
    },
    {
      prop: 'status',
      label: '状态',
      slots: ({row}) => {
        const stateMap: Record<MessageStatus, string> = {
          [MessageStatus.UnSend]: '未发送',
          [MessageStatus.Send]: '已发送',
          [MessageStatus.Read]: '已读',
          [MessageStatus.Confirm]: '已确认',

        }
        return <span>{stateMap[row.status as MessageStatus]}</span>
      },
    },
    {
      prop: 'title',
      label: '标题',
    },
    {
      prop: 'content',
      label: '消息内容',
    },
    {
      prop: 'receiverName',
      label: '接收人',
    },
    {
      prop: 'founderName',
      label: '创建人姓名',
    },
    {
      prop: 'sendTime',
      label: '发送时间',
    },
    // {
    //   prop: undefined,
    //   label: '操作',
    //   width: '400em',
    //   slots: ({ row }) => <SkAppOperations
    //     modules={['r', 'u', 'run', 'nodes', 'd']}>
    //   </SkAppOperations>,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
  ] as Col[],
  columns: [] as Col[],
  query: {},
  pagination: {
    pageSize: 10,
    start: 0,
  },
  total: 0,
})

// const queryItems: __SkAppQueryForm.FormItem[] = [
//   {
//     templateType: 'VkfInput',
//     prop: 'name',
//     label: '接收人',
//     clearable: true,
//     class: 'w-200px',
//   },
// ]

// const formData = ref({
//   type: 'all',
// } as NormalObject)


watch(() => tableState.pagination, r, { deep: true, immediate: true })
function r () {
  return rMessageList(tableState.pagination).then(res => {
    if (!res) {
      return
    }
    if (!tableState.columns.length) {
      tableState.columns = [
        // ...res.columns as Col[],
        ...tableState._columns,
      ]
    }
    tableState.data = res.rows
    tableState.total = res.total
  })
}

</script>


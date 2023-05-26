<template>
  <PageX>
    <VkDuplexCalc class="pa-page h-full">
      <template #one>
        <div
          sk-flex="row-end"
          class="mb"
        >
          <ElButton
            type="primary"
            @click="$router.push('/system/message/sms/add')"
          >
            新增
          </ElButton>
        </div>
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
import { SkAppOperations, SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { VkDuplexCalc } from '@vunk/core'
import { reactive, watch } from 'vue'
import { rSmsList, dSms } from '@skzz-platform/api/system/message'
import { Row } from './types'
import router from '@/router'

type Col = __SkAppTablesV1.Column<Row>

const tableState = reactive({
  data: [] as Row[],
  _columns: [
    {
      prop: 'sender',
      label: '发送人',
    },
    {
      prop: 'appKey',
      label: 'appKey',
    },
    {
      prop: 'appSecret',
      label: 'appSecret',
    },
    {
      prop: 'url',
      label: 'url',
    },
    {
      prop: 'statusCallBack',
      label: 'statusCallBack',
    },
    {
      prop: undefined,
      label: '操作',
      width: '200em',
      align: 'center',
      headerAlign: 'center',
      slots: ({ row }) => <SkAppOperations
        modules={['r', 'u', 'd']}
        onU={() => router.push(`/system/message/sms/edit/${row.id}`)}
        onD={() => dSms(row.id).then(r)}
        onR={() => router.push(`/system/message/sms/detail/${row.id}`)}
      >
      </SkAppOperations>,
    },
  ] as Col[],
  columns: [] as Col[],
  query: {},
  pagination: {
    pageSize: 10,
    start: 0,
  },
  total: 0,
})


watch(() => tableState.pagination, r, { deep: true, immediate: true })
function r () {
  return rSmsList(tableState.pagination).then(res => {
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


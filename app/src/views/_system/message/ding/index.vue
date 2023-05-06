<template>
  <PageX>
    <VkDuplexCalc class="pa-page h-full">
      <template #one>
        <div sk-flex="row-end" class="mb">
          <ElButton type="primary" @click="$router.push('/system/message/ding/add')">新增</ElButton>
        </div>
      </template>
      <SkAppTablesV1 :defaultExpandAll="true" flex-1 :rowKey="'menuId'" :columns="tableState.columns"
        :data="tableState.data" :total="tableState.total" v-model:page-size="tableState.pagination.pageSize"
        v-model:start="tableState.pagination.start">
      </SkAppTablesV1>
    </VkDuplexCalc>
  </PageX>
</template>

<script lang="tsx" setup>
import PageX from '_c/PageX/index.vue'
import { SkAppOperations, SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { VkDuplexCalc } from '@vunk/core'
import { reactive, watch } from 'vue'
import { rDingList, dDing } from '@skzz/platform/api/system/message'
import { Row } from './types'
import router from '@/router'

type Col = __SkAppTablesV1.Column<Row>

const tableState = reactive({
  data: [] as Row[],
  _columns: [
    {
      prop: 'userAccessKey',
      label: 'userAccessKey',
    },
    {
      prop: 'userSecretKey',
      label: 'userSecretKey',
    },
    {
      prop: 'domainName',
      label: 'domainName',
    },
    {
      prop: 'dingDenantId',
      label: 'dingTenantId',
    },
    {
      prop: undefined,
      label: '操作',
      width: '200em',
      align: 'center',
      headerAlign: 'center',
      slots: ({ row }) => <SkAppOperations
        modules={['r', 'u', 'd']}
        onU={() => router.push(`/system/message/ding/edit/${row.id}`)}
        onD={() => dDing(row.id).then(r)}
        onR={() => router.push(`/system/message/ding/detail/${row.id}`)}
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
  return rDingList(tableState.pagination).then(res => {
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


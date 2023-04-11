<template>
  <PageX>
    <SkAppCard :header="'表单配置'" class="h-100%">
      <VkDuplexCalc class="gap-main-x">
        <template #one>
          <div sk-flex="row-end" class="mb">
            <ElButton type="primary" @click="$router.push('/system/form/add')">新增</ElButton>
          </div>
        </template>
        <SkAppTablesV1 :defaultExpandAll="true" flex-1 :rowKey="'menuId'" :columns="tableState.columns"
          :data="tableState.data" :total="tableState.total" v-model:page-size="tableState.pagination.pageSize"
          v-model:start="tableState.pagination.start">
        </SkAppTablesV1>
      </VkDuplexCalc>
    </SkAppCard>
  </PageX>
</template>

<script lang="tsx" setup>
import PageX from '_c/PageX/index.vue'
import { SkAppCard } from '@skzz/platform'
import { SkAppOperations, SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { VkDuplexCalc } from '@vunk/core'
import { reactive, watch } from 'vue'
import { rWeixinList, dWeixin } from '@skzz-platform/api/system/message'
import { Row } from './types'
import router from '@/router'

type Col = __SkAppTablesV1.Column<Row>
  
const tableState = reactive({
  data: [] as Row[],
  _columns: [
    {
      prop: 'appId',
      label: '表单名称',
    },
    {
      prop: '创建时间',
      label: 'secret',
    },
    {
      prop: 'chuang',
      label: '创建人',
    },
    {
      prop: undefined,
      label: '操作',
      width: '200em',
      align: 'center',
      headerAlign: 'center',
      slots: ({ row }) => <SkAppOperations
        modules={['r', 'u', 'd']}
        onU={() => router.push(`/system/form/edit/${row.id}`)}
        onD={() => dWeixin(row.id).then(r)}
        onR={() => router.push(`/system/form/detail/${row.id}`)}
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
  tableState.columns = [
    // ...res.columns as Col[],
    ...tableState._columns,
  ]
  // return rWeixinList(tableState.pagination).then(res => {
  //   if (!res) {
  //     return
  //   }
  //   if (!tableState.columns.length) {
  //     tableState.columns = [
  //       // ...res.columns as Col[],
  //       ...tableState._columns,
  //     ]
  //   }
  //   tableState.data = res.rows
  //   tableState.total = res.total
  // })
}

</script>


<template>
  <PageX>
    <SkAppCard :header="'消息数据'" class="h-100%">
      <VkDuplexCalc class="gap-main-x">
        <template #one>
          <div sk-flex="row-end" class="mb">
            <ElButton type="primary" @click="$router.push('/system/message/config/add')">新增</ElButton>
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
import { SkAppCard, __SkAppTables, __SkAppQueryForm } from '@skzz/platform'
import { SkAppOperations, SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { VkDuplexCalc } from '@vunk/core'
import { reactive, ref, watch } from 'vue'
import { dMessageConfig, rMessageConfigList } from '@skzz-platform/api/system/message/config'
import { Option } from '@skzz-platform/api/system/dictionary'
import { Row } from './types'
import router from '@/router'
import { useDictionaryStore } from '@/stores/dictionary'
type Col = __SkAppTablesV1.Column<Row>
  
const dicStore = useDictionaryStore()

const tableState = reactive({
  data: [] as Row[],
  _columns: [
    {
      prop: 'path',
      label: '跳转路由',
    },
    {
      prop: 'param',
      label: '路由参数',
    },
    {
      prop: 'client',
      label: '接收端',
      slots: ({row}) => {
        const d = dicStore.getTemplateDic()
        const client = ref<Option>()
        d.then((dic) => {
          dic.find(item => item.value === row.client)
        })
        return <span>
          {client.value ? client.value.label : row.client}
        </span>
      },
    },
    {
      prop: 'tplId',
      label: '消息模板ID',
    },
    {
      prop: 'type',
      label: '业务类型',
    },
    {
      prop: 'requireRead',
      label: '要求已读回执',
      formatter: (row) => {
        return row.requireConfirm ? '是' : '否'
      },
    },
    {
      prop: 'requireConfirm',
      label: '要求确认回执',
      formatter: (row) => {
        return row.requireConfirm ? '是' : '否'
      },
    },
    {
      prop: undefined,
      label: '操作',
      width: '200em',
      align: 'center',
      headerAlign: 'center',
      slots: ({ row }) => <SkAppOperations
        modules={['r', 'u', 'd']}
        onU={() => router.push(`/system/message/config/edit/${row.id}`)}
        onD={() => dMessageConfig(row.id).then(r)}
        onR={() => router.push(`/system/message/config/detail/${row.id}`)}
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
  return rMessageConfigList(tableState.pagination).then(res => {
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


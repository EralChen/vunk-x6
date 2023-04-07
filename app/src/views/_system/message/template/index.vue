<template>
  <PageX>
    <SkAppCard :header="'消息模板'" class="h-100%">
      <VkDuplexCalc class="gap-main-x">
        <template #one>
          <SkAppQueryForm :fixes="2" :data="formData" @setData="setData(formData, $event)" :formItems="queryItems">
            <template #options>
              <ElButton type="primary" @click="$router.push('/system/message/template/add')">新增</ElButton>
            </template>
          </SkAppQueryForm>
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
import { SkAppCard, __SkAppTables, SkAppQueryForm, __SkAppQueryForm } from '@skzz/platform'
import { SkAppOperations, SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { NormalObject, VkDuplexCalc, setData } from '@vunk/core'
import { reactive, ref, watch } from 'vue'
import { Row } from './types'
import { dTemplate, rTemplateList } from '@skzz-platform/api/system/message/template'
import router from '@/router'
type Col = __SkAppTablesV1.Column<Row>

const tableState = reactive({
  data: [] as Row[],
  _columns: [
    {
      prop: 'title',
      label: '标题',
    },
    {
      prop: 'tpl',
      label: '模板',
    },
    {
      prop: 'clientTemplateId',
      label: '模版id',
    },
    {
      prop: 'client',
      label: '接收端',
    },
    {
      prop: undefined,
      label: '操作',
      width: '200em',
      align: 'center',
      headerAlign: 'center',
      slots: ({ row }) => <SkAppOperations
        modules={['r', 'u', 'd']}
        onU={() => router.push(`/system/message/template/edit/${row.id}`)}
        onD={() => dTemplate(row.id).then(r)}
        onR={() => router.push(`/system/message/template/detail/${row.id}`)}
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

const queryItems: __SkAppQueryForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'title',
    label: '标题',
    clearable: true,
    class: 'w-240px',
  },
]



const formData = ref({
  type: 'all',
} as NormalObject)


watch(() => tableState.pagination, r, { deep: true, immediate: true })
function r () {
  return rTemplateList(tableState.pagination)
    .then(res => {
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


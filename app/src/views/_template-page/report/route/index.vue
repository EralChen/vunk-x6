<script lang="tsx" setup>
import type { __SkAppQueryForm, __SkAppTables, Pagination } from '@skzz/platform'
import type { ApiReturnType, NormalObject } from '@vunk/core'
import {
  SkAppOperations,
  SkAppQueryForm,
  SkAppTables,
} from '@skzz/platform'
import { dRoles, rRoles } from '@skzz/platform/api/system/role'
import { useRouterTo, useRouteSocket } from '@skzz/platform/composables'
import { genColumn } from '@skzz/platform/shared/utils-data'
import { setData, VkDuplexCalc } from '@vunk/core'
import PageX from '_c/PageX/index.vue'
import { reactive, ref, watch } from 'vue'

type Res = ApiReturnType<typeof rRoles>

const { createReceiver } = useRouteSocket()
const { routerNext } = useRouterTo()
const receiver = createReceiver()

receiver.addListener(r)

/* query */
const queryItems: __SkAppQueryForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '姓名',
  },
]
const queryData = ref({} as NormalObject)

const pagination = ref<Pagination>({
  pageSize: 10,
  start: 0,
})
watch(pagination, r, { deep: true, immediate: true })
// watch(queryData, r, { deep: true , immediate: true })

/* query end */

const tableState = reactive({
  columns: [] as __SkAppTables.Column[],
  data: [] as Res['rows'],
  total: 0,
})

const operationsCol: __SkAppTables.Column = {
  title: '操作',
  key: 'operations',
  width: 150,
  flexGrow: 1,
  align: 'center',

  cellRenderer: ({ rowData }) => (
    <SkAppOperations
      modules={['u', 'd']}
      onD={() => { d([rowData.id]) }}
    >
    </SkAppOperations>
  ),
}
function r () {
  return rRoles(queryData.value, pagination.value).then((res) => {
    if (!tableState.columns.length) {
      tableState.columns = res.columns.reduce((a, c) => {
        if (c.type === 'selection') {
          return a
        }
        if (c.type === 'button') {
          a.push(operationsCol)
        }
        else {
          a.push(genColumn(c))
        }

        return a
      }, [] as __SkAppTables.Column[])
    }
    tableState.data = res.rows
    tableState.total = res.total
  })
}
function d (ids: string[]) {
  dRoles(ids).then(r)
}
function precI () {
  routerNext({
    path: 'create',
    mode: 'push',
  })
}
</script>

<template>
  <PageX>
    <VkDuplexCalc class="gap-main-x">
      <template #one>
        <SkAppQueryForm
          :data="queryData"
          :form-items="queryItems"
          @set-data="setData(queryData, $event)"
          @enter="r"
        >
          <template #options>
            <ElButton
              type="primary"
              @click="r"
            >
              查询
            </ElButton>
            <ElButton
              type="primary"
              @click="precI"
            >
              新增
            </ElButton>
          </template>
        </SkAppQueryForm>
      </template>

      <SkAppTables
        v-bind="tableState"
        v-model:start="pagination.start"
        v-model:page-size="pagination.pageSize"
        class="h-100%"
      >
      </SkAppTables>
    </VkDuplexCalc>
  </PageX>
</template>

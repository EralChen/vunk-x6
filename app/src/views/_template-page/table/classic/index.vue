<script lang="tsx" setup>
import type { __SkAppQueryForm, Pagination } from '@skzz/platform'
import type { __SkAppTablesV1 } from '@skzz/platform/components/app-tables-v1'
import type { ApiReturnType, NormalObject } from '@vunk/core'
import {
  SkAppOperations,
  SkAppQueryForm,
} from '@skzz/platform'
import { dRoles, rRoles } from '@skzz/platform/api/system/role'
import { SkAppTablesV1 } from '@skzz/platform/components/app-tables-v1'
import { useRouterTo } from '@skzz/platform/composables'
import { setData, VkDuplexCalc } from '@vunk/core'
import PageX from '_c/PageX/index.vue'
import { reactive, ref, watch } from 'vue'

type Res = ApiReturnType<typeof rRoles>
const { routerNext } = useRouterTo()
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
  columns: [] as __SkAppTablesV1.Column[],
  data: [] as Res['rows'],
  total: 0,
})

const operationsCol: __SkAppTablesV1.Column = {
  // title: '操作',
  label: '操作',
  prop: 'operations',
  // key: 'operations',
  width: 150,
  // flexGrow: 1,
  align: 'center',
  slots: {
    default: ({ row }) => (
      <SkAppOperations
        modules={['u', 'd']}
        onD={() => { d([row.id]) }}
      >
      </SkAppOperations>
    ),
  },

}
function r () {
  rRoles(queryData.value, pagination.value).then((res) => {
    if (!tableState.columns.length) {
      tableState.columns = res.columns.reduce((a, c) => {
        if (c.type === 'selection') {
          return a
        }
        if (c.type === 'button') {
          a.push(operationsCol)
        }
        else {
          a.push({
            label: c.label,
            prop: c.prop,
            align: c.align,
          })
        }

        return a
      }, [] as __SkAppTablesV1.Column[])
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

      <SkAppTablesV1
        v-bind="tableState"
        v-model:start="pagination.start"
        v-model:page-size="pagination.pageSize"
        class="h-100%"
      >
      </SkAppTablesV1>
    </VkDuplexCalc>
  </PageX>
</template>

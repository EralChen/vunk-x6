<script lang="tsx" setup>
import { computed, reactive, ref, watch } from 'vue'
import { rWorkflows, cuWorkflow, dWorkflows, bindForm2Flow, rWorkflowBtns } from '@skzz-platform/api/system/workflow'
import { SkAppDialog, SkAppOperations, SkAppTablesV1, __SkAppTablesV1 } from '@skzz/platform'
import { setData, VkDuplexCalc } from '@vunk/core'
import { Row } from './types'
import { useRouterTo } from '@skzz-platform/composables'
import { ElButton } from 'element-plus'
import BindUserTable from './bind-form-table/index.vue'
import { CForm } from '@skzz-platform/api/system/form'
import BindCallback from './bind-callback/index.vue'
import { useWorkflowResolveQueryU } from './utils'
import CUForm from './cu-form/index.vue'
import { ButtonId } from '@skzz-platform/shared/enum'
import { SkIncreaseButton } from '@skzz-platform/components/increase-button'



type Col = __SkAppTablesV1.Column<Row>
const { routerNext } = useRouterTo()

const bindVallback = reactive({
  id: '',
  formId: '',
})


const { addListener } = useWorkflowResolveQueryU()
addListener(() => r())

const operationsModules = ref<string[]>([])
rWorkflowBtns().then(res => {
  operationsModules.value = res.map(item => item.buttonId)
})

const tableState = reactive({
  data: [] as Row[],
  _columns: [
    {
      prop: 'name',
      label: '名称',
    },
    {
      prop: 'itemId',
      label: '关联业务ID',
    },
    {
      prop: 'formName',
      label: '关联表单名称',
    },
    {
      prop: 'formVersion',
      label: '关联表单版本',
    },
    {
      prop: 'isStart',
      label: '是否启动',
      slots: ({ row }) => <span>{row.isStart ? '是' : '否'}</span>,
    },
    {
      prop: undefined,
      label: '操作',
      width: '450em',
      slots: ({ row }) => {
        const modules = [...operationsModules.value]
        const uAfterIndex = modules.indexOf(ButtonId.modify) + 1

        // 流程没启动前可以绑定表单
        if (!row.isStart) {
          modules.splice(uAfterIndex, 0, 'bind')
        }
        if (row.isStart) {
          modules.splice(modules.length - 1, 0, 'instances')
        }
        if (row.formName) {
          if (!row.isStart) {
            modules.splice(uAfterIndex, 0, 'nodes')
          }
        }

        return <SkAppOperations
          modules={modules}
          excludes={['increase']}
          buttonPropsRecord={
            {
              search: {
                disabled: !row.formName,
              },
            }
          }
          onR={() => rI(row.id)}
          onD={() => d([row.id])}
          onU={() => preuI(row)}
          v-slots={{
            callback: () => <ElButton type="primary" size="small" onClick={
              () => { 
                bindVallback.id = row.id
                bindVallback.formId = row.formId as string
              }
            }>绑定回调</ElButton>,
            nodes: () =>
              <ElButton type="primary" size="small" onClick={
                () => routerNext({ path: 'nodes/' + row.flowId })
              }>配置节点</ElButton>,
            bind: () =>
              <ElButton type="primary" size="small" onClick={
                () => {
                  bindData.id = row.id
                  if (row.formId && row.formName) {
                    bindData.data = {
                      id: row.formId,
                      formName: row.formName,
                    }
                  }
                }}>绑定表单</ElButton>,
            instances: () => {
              return <ElButton type="primary" size="small" onClick={
                () => routerNext({ path: 'instances/' + row.flowId })
              }>流程实例</ElButton>
            },
          }}
        >
        </SkAppOperations>
      },

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
const cuState = reactive({
  type: '' as 'c' | 'u' | '',
  data: {} as Partial<Row>,
})
const cuData = computed(() => {
  return {
    ...cuState.data,
  }
})
const bindData = reactive({
  id: '',
  data: {},
}) as {
  id: string
  data: CForm
}

watch(() => tableState.pagination, r, { deep: true, immediate: true })
function r () {
  return rWorkflows({}, tableState.pagination).then(res => {
    if (!tableState.columns.length) {
      tableState.columns = [
        ...res.columns as Col[],
        ...tableState._columns,
      ]
    }
    tableState.data = res.rows
    tableState.total = res.total
  })
}
function d (ids: string[]) {
  dWorkflows(ids).then(() => {
    r()
  })
}
function precI () {
  cuState.type = 'c'
  cuState.data = {}
}
function preuI (row: Row) {
  cuState.type = 'u'
  cuState.data = { ...row }
}
function cuI () {
  cuWorkflow(cuData.value).then(() => {
    r()
    cuState.type = ''
  })
}
function rI (id: string) {
  routerNext({
    path: 'read/' + id,

  })
}

function bindUser () {
  bindForm2Flow(bindData.id, bindData.data.id)
    .then(() => {
      bindData.id = ''
      bindData.data = {} as CForm
      r()
    })
}

</script>
<template>
  <page-x>
    <VkDuplexCalc
      :gap="'var(--gap-page)'"
      class="pa-page h-full"
    >
      <template #one>
        <div sk-flex="row-between-center">
          <span />
          <SkIncreaseButton 
            :btns="rWorkflowBtns()"
            @click="precI"
          />
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

    <SkAppDialog
      :model-value="!!cuState.type"
      :title="cuState.type === 'u' ? '编辑' : '新增'"
      @update:modelValue="cuState.type = ''"
    >
      <CUForm
        :type="cuState.type"
        :data="cuState.data"
        @setData="setData(cuState.data, $event)"
        @submit="cuI"
      />
    </SkAppDialog>

    <!-- 绑定表单 -->
    <SkAppDialog
      :model-value="!!bindData.id"
      title="绑定表单"
      @update:modelValue="bindData.id = ''"
    >
      <BindUserTable
        v-model="bindData.data"
        class="h-30em"
      />
      <template #footer>
        <el-button
          size="large"
          type="primary"
          @click="bindUser"
        >
          确定
        </el-button>
      </template>
    </SkAppDialog>
    <!-- 绑定 回调 -->
    <SkAppDialog
      :model-value="!!bindVallback.id"
      title="绑定流程回调"
      @update:modelValue="bindVallback.id = ''"
    >
      <BindCallback
        :id="bindVallback.id"
        :form-id="bindVallback.formId"
        @success="bindVallback.id = ''"
      />
    </SkAppDialog>
  </page-x>
</template>

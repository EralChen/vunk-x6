<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { rWorkflowNode, WorkflowNode, cuWorkflowNode } from '@skzz-platform/api/system/workflow'
import { SkAppDialog } from '@skzz/platform'
import CuForm from './cu-form/index.vue'
import { setData } from '@vunk/core'
type Row = Partial<WorkflowNode>
const props = defineProps({
  flowId: {
    type: String,
    required: true,
  },
})
const data = ref<Row[]>([])

const cuState = reactive({
  type: '' as 'c' | 'u' | '',
  data: {} as Row,
})

watch(() => props.flowId, r, { immediate: true })
function r () {
  rWorkflowNode({
    flowId: props.flowId,
  }).then((res) => {
    data.value = res.rows
  })
}
function precI () {
  cuState.type = 'c'
  cuState.data = {}
}
function preuI (row: Row) {
  cuState.type = 'u'
  cuState.data = {...row}
}
function cuI () {
  cuWorkflowNode({
    ...cuState.data,
    flowId: props.flowId,
  }).then(() => {
    r()
    cuState.type = ''
  })
}
</script>
<template>
  <PageOver>

    <div gap-main-x>
      <div sk-flex="row-between-center">
        <span></span>
        <ElButton type="primary"
          @click="precI"
        >新建</ElButton>
      </div>

      <div>{{ data }}</div>
      <div>{{ flowId }}</div>
    </div>

    <SkAppDialog 
      :modelValue="!!cuState.type"
      :title="cuState.type === 'c' ? '新建' : '编辑'"
      @update:modelValue="cuState.type = ''"
    >
      <CuForm
        :type="cuState.type"
        :data="cuState.data"
        @setData="setData(cuState.data, $event)"
        @submit="cuI"
      ></CuForm>
    </SkAppDialog>

  </PageOver>
</template>

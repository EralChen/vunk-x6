<template>
  <PageOver>
    <SkAppCard class="h-full" header="节点详情">
      <div class="editor-x" sk-flex="row">
        <div class="editor">
          <ZzEditor :mode="'default'" :model-value="model" @nodeselectchange="nodeSelectChange"></ZzEditor>
        </div>
        <div class="form">
          <ElForm label-position="top">
            <ElFormItem v-show="bindState.nodeId" :label="`绑定人员(${bindState.data.length ? '已绑定' : '未绑定'})`">
              <el-button :disabled="!bindState.nodeId" type="primary" @click="preBind()">绑定</el-button>
            </ElFormItem>
            <ElFormItem label="开始流程" v-show="!bindState.currentNodeInstIds.length">
              <el-button type="primary" @click="doRunWorkflow">运行</el-button>
            </ElFormItem>
            <ElFormItem label="审批" v-show="bindState.currentNodeInstIds.length">
              <div mt-page mb-page w-100>
                <el-input type="textarea" v-model="memo"></el-input>
              </div>
              <el-button type="primary" @click="doApprovel(WorkFlowNodeState.通过, 'pass')">通过</el-button>
              <el-button type="warning" @click="doApprovel(WorkFlowNodeState.驳回, 'bh')">驳回</el-button>
              <el-button v-show="bindState.nodeId && bindState.currentNodeData.auditStatus" type="success"
                @click="doApprovel(WorkFlowNodeState.驳回, 'th')">退回</el-button>
            </ElFormItem>
          </ElForm>
        </div>
      </div>
    </SkAppCard>
  </PageOver>
  <SkAppDialog v-model="showdialog" :title="'绑定操作人'">
    <SkUserTablesSelect v-model="bindState.data" class="h-40em"></SkUserTablesSelect>
    <template #footer>
      <el-button size="large" type="primary" @click="bindOpers">确定</el-button>
    </template>
  </SkAppDialog>
</template>

<script setup lang="ts">
import { ZzEditor } from '@zzg6/flow'
import { bindOpersToNode, doApproveNode, rWorkflowNodesWithRaw, WorkflowNode, WorkFlowNodeState, runWorkflow, Workflow } from '@skzz-platform/api/system/workflow'
import { reactive, ref, shallowRef, watch } from 'vue'
import { SkAppCard, SkAppDialog } from '@skzz/platform'
import { SkUserTablesSelect } from '@skzz-platform/components/user-tables-select'
import { User } from '@skzz-platform/api/system/user'


type Row = Partial<WorkflowNode>

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const model = shallowRef({})
const showdialog = ref(false)
const flowData = ref({} as Workflow)
const bindState = reactive({
  nodeId: '',
  data: [] as User[],
  currentNodeInstIds: [] as string[],
  currentNodeData: {} as WorkflowNode,
})
const memo = ref('')
watch(() => props.id, r, { immediate: true })

function r () {
  rWorkflowNodesWithRaw({
    id: props.id,
  }).then(res => {
    model.value = res.raws
    bindState.currentNodeInstIds = res.raws.currentNodeInstIds
    flowData.value = res.info
  })
}


const nodeSelectChange = (e: any) => {
  if (e.target) {
    const m = e.target.getModel()
    bindState.nodeId = m.id
    bindState.currentNodeData = m
    bindState.data = m.opers?.map((id: string) => ({ id })) || []
  } else {
    bindState.nodeId = ''
    bindState.data = []
  }
}

function preBind () {
  if (bindState.nodeId)
    showdialog.value = true
}
function bindOpers () {
  bindOpersToNode(
    bindState.nodeId,
    bindState.data.map(item => item.id),
  ).then(() => {
    showdialog.value = false
    bindState.nodeId = ''
    r()
  })
}

function doApprovel (type: WorkFlowNodeState, e: string) {
  let currentBackId
  if (e === 'th') {
    currentBackId = bindState.nodeId
  }
  doApproveNode(props.id, type, memo.value, bindState.currentNodeInstIds[0], currentBackId)
    .then(() => {
      r()
    })
}

function doRunWorkflow () {
  if (flowData.value.itemId)
    runWorkflow(flowData.value.itemId).then(r)
}

</script>

<style lang="scss" scoped>
.editor-x {
  height: 100%;
}

.editor {
  width: 80%;
}

.form {
  width: 20%;
  border-left: 1px solid var(--el-border-color);
  padding: var(--gap-m);
}
</style>
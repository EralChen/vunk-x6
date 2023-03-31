<template>
  <PageOver>
    <SkAppCard class="h-full" header="节点详情">
      <div class="editor-x" sk-flex="row">
        <div class="editor">
          <ZzEditor :mode="'default'" :model-value="model" @nodeselectchange="nodeSelectChange"></ZzEditor>
        </div>
        <div class="form">
          <ElForm label-position="top">
            <ElFormItem :label="`绑定人员(${bindState.data.length ? '已绑定' : '未绑定'})`">
              <el-button :disabled="!bindState.nodeId" type="primary" @click="preBind()">绑定</el-button>
            </ElFormItem>
            <ElFormItem label="审批">
              <div mt-page mb-page w-100>
                <el-input type="textarea" v-model="memo"></el-input>
              </div>
              <el-button type="primary" @click="doApprovel(WorkFlowNodeState.通过)">通过</el-button>
              <el-button type="warning" @click="doApprovel(WorkFlowNodeState.驳回)">驳回</el-button>
              <el-button type="success" @click="doApprovel(WorkFlowNodeState.驳回)">退回</el-button>
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
import { bindOpersToNode, doApproveNode, rWorkflowNodesWithRaw, WorkflowNode, WorkFlowNodeState } from '@skzz-platform/api/system/workflow'
import { reactive, ref, shallowRef, watch } from 'vue'
import { SkAppCard, SkAppDialog } from '@skzz/platform'
import { SkUserTablesSelect } from '@skzz-platform/components/user-tables-select'
import { ElMessage } from 'element-plus'


type Row = Partial<WorkflowNode>

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const model = shallowRef({})
const showdialog = ref(false)
const bindState = reactive({
  nodeId: '',
  data: [] as WorkflowNode[],
})
const memo = ref('')
watch(() => props.id, r, { immediate: true })

function r () {
  rWorkflowNodesWithRaw({
    id: props.id,
  }).then(res => {
    model.value = res.raws
  })
}


const nodeSelectChange = (e: any) => {
  if (e.target) {
    bindState.nodeId = e.target.getModel().id
    bindState.data = e.target.getModel().opers?.map((id: string) => ({id})) || []
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

function doApprovel (type: WorkFlowNodeState) {
  if (!bindState.nodeId) {
    ElMessage.warning('请先选择节点')
    return 
  }
  doApproveNode(props.id, type, bindState.nodeId, memo.value)
  console.log('doApprovel', type)
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
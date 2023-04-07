<template>
  <PageOver>
    <SkAppCard class="h-full" header="节点详情">
      <div class="editor-x" sk-flex="row">
        <div class="editor">
          <ZzEditor :mode="'default'" :model-value="model" @nodeselectchange="nodeSelectChange"></ZzEditor>
        </div>
        <div class="form">
          <ElScrollbar>
            <ElForm label-position="top">
              <ElFormItem v-show="bindState.nodeId" :label="`绑定人员`">
                <BindUser v-model="showdialog" v-model:data="bindState.data" @doBindUser="bindOpers"></BindUser>
              </ElFormItem>

              <ElFormItem label="开始流程" v-show="!isFlowStart">
                <el-button type="primary" @click="doRunWorkflow">运行</el-button>
              </ElFormItem>

              <ElFormItem v-show="bindState.nodeId && isFlowStart && bindState.currentNodeData.isCurrentNode"
                :label="`绑定协办人`">
                <BindUser v-model="showAssDialog" v-model:data="bindState.assData" @doBindUser="bindAssOpers"></BindUser>
              </ElFormItem>

              <ElFormItem label="审批" v-show="isFlowStart && (hasApprovelAuth || hasAssistAuth)">
                <div mt-page mb-page w-100>
                  <el-input type="textarea" v-model="memo"></el-input>
                </div>
                <el-button type="primary" @click="doApprovel(WorkFlowNodeState.通过, 'pass')">通过</el-button>
                <el-button type="warning" @click="doApprovel(WorkFlowNodeState.驳回, 'bh')">驳回</el-button>
                <el-button v-show="bindState.nodeId && bindState.currentNodeData.auditStatus" type="success"
                  @click="doApprovel(WorkFlowNodeState.驳回, 'th')">退回</el-button>
              </ElFormItem>
            </ElForm>
          </ElScrollbar>
        </div>
      </div>
    </SkAppCard>
  </PageOver>
</template>

<script setup lang="ts">
import { ZzEditor } from '@zzg6/flow'
import { bindOpersToNode, doApproveNode, rWorkflowNodesWithRaw, WorkflowNode, WorkFlowNodeState, runWorkflow, Workflow, bindAssistOperToNode } from '@skzz-platform/api/system/workflow'
import { computed, reactive, ref, shallowRef, watch } from 'vue'
import { SkAppCard } from '@skzz/platform'
import { User } from '@skzz-platform/api/system/user'
import BindUser from './bind-user/index.vue'
import { useUserStore } from '@skzz-platform/stores/user'
import { ElMessage } from 'element-plus'

// type Row = Partial<WorkflowNode>

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const model = shallowRef({})
const showdialog = ref(false)
const showAssDialog = ref(false)
const memo = ref('')
const flowData = ref({} as Workflow)
const bindState = reactive({
  nodeId: '',
  data: [] as User[],
  assData: [] as User[],
  currentNodeInstIds: [] as string[],
  currentNodeData: {} as WorkflowNode,
})
const userStore = useUserStore()
const isFlowStart = computed(() => !!bindState.currentNodeInstIds.length)
const hasApprovelAuth = computed(() => {
  let opers = bindState.currentNodeData.opers
  const ids = opers?.map(item => item.id + '')
  return ids?.includes(userStore.getUserInfo().id + '')
})

const hasAssistAuth = computed(() => {
  let opers = bindState.currentNodeData.assistOpers
  const ids = opers?.map(item => item.id + '')
  return ids?.includes(userStore.getUserInfo().id + '')
})


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

/**
 * 选中节点事件
 * @param e 
 */
const nodeSelectChange = (e: any) => {
  if (e.target) {
    const m = e.target.getModel()
    bindState.nodeId = m.id
    bindState.currentNodeData = m
    bindState.data = m.opers
    bindState.assData = m.assistOpers
  } else {
    bindState.nodeId = ''
    bindState.data = []
    bindState.assData = []
  }
}

/**
 * 绑定操作人,使用节点id
 */
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

function getCurrentNodeId () {
  let currentNodeId = bindState.currentNodeInstIds[0]
  if (bindState.currentNodeInstIds.length > 1) {
    if (!bindState.currentNodeData.nodeInstId) {
      ElMessage.warning('选中节不是当前节点')
      return
    }
    if (!bindState.nodeId) {
      ElMessage.warning('有多个当前节点，请选择一个节点')
      return
    }
    currentNodeId = bindState.currentNodeData.nodeInstId
  }
  return currentNodeId
}

/**
 * 绑定协办人  
 * 1. 只能针对未审核的节点实例添加  
 * 2. 只有当前登录用户与待审核节点的审批人一致,才能添加协办人  
 * 3. 必须当前用户和协办用户全部审批完成,节点才会走向下一节点  
 * 4. 协办用户不支持回退,比如现在有ABC三个节点,B节点添加了协办人,全部审批通过后到了C节点,C节点操作回退到了B节点,B节点只会生成节点定义时指定的那些审批人实例  
 */
function bindAssOpers () {
  let currentNodeId = getCurrentNodeId()
  if (!currentNodeId) return
  bindAssistOperToNode(
    currentNodeId,
    bindState.assData.map(item => item.id),
  ).then(() => {
    showAssDialog.value = false
    bindState.nodeId = ''
    r()

  })
}

/**
 * 审批  
 * 1. 驳回逻辑为直接将整个流程中已审批的流程全部退回，传的为实例id,字段为 nodeInstId  
 * 2. 退回逻辑，指定某个节点，退回到该节点，传的是定义的id,字段为 backNodeId  
 */
function doApprovel (type: WorkFlowNodeState, e: string) {
  let currentBackId

  let currentNodeId = getCurrentNodeId()
  if (!currentNodeId) return

  if (e === 'th') {
    currentBackId = bindState.nodeId
  }
  doApproveNode(
    props.id,
    type,
    memo.value,
    currentNodeId,
    currentBackId,
  ).then(() => {
    r()
  })
}

/**
 * 运行流程
 */
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
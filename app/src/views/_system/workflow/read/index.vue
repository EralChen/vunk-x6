<template>
  <PageOver>
    <SkAppCard class="h-full" header="节点详情">
      <div class="editor-x" sk-flex="row">
        <div class="editor">
          <ZzG6Editor :selectNodeId="nodeModel.id" :mode="'default'" :model-value="model" @nodeselectchange="nodeSelectChange"></ZzG6Editor>
        </div>
        <div class="form">
          <ElScrollbar>
            <ElForm label-position="top">
              <BindOpers :node-model="nodeModel" @bind-success="operBindSuccess"></BindOpers>
              <ElFormItem label="开始流程" v-show="!isFlowStart">
                <el-button type="primary" @click="doRunWorkflow">运行</el-button>
              </ElFormItem>
              <BindAssitsOpers :node-model="nodeModel" :currentNodeInstIds="bindState.currentNodeInstIds" @bind-success="operBindSuccess" :isFlowStart="isFlowStart"></BindAssitsOpers>
              <Approval :flowId="id" :node-model="nodeModel" :currentNodeInstIds="bindState.currentNodeInstIds" :isFlowStart="isFlowStart" @approvalSuccess="approvalSuccess"></Approval>
            </ElForm>
          </ElScrollbar>
        </div>
      </div>
    </SkAppCard>
  </PageOver>
</template>

<script setup lang="tsx">
import { rWorkflowNodesWithRaw, runWorkflow, Workflow } from '@skzz-platform/api/system/workflow'
import { computed, reactive, ref, shallowRef, watch } from 'vue'
import { SkAppCard } from '@skzz/platform'
import { User } from '@skzz-platform/api/system/user'
import ZzG6Editor from '@/components/ZzG6Editor/index.vue'
import BindOpers from './bind-opers/index.vue'
import BindAssitsOpers from './bind-assist-opers/index.vue'
import Approval from './approval/index.vue'
import { cloneDeep } from 'lodash'
import { NodeModel } from '@zzg6/flow/components/editor/src/types'


// type Row = Partial<WorkflowNode>

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const nodeModel = ref({} as NodeModel<User>)
const model = shallowRef({}) // 流程节点数据
const flowData = ref({} as Workflow) // 流程详情
const bindState = reactive({
  currentNodeInstIds: [] as string[],
})
const isFlowStart = computed(() => !!bindState.currentNodeInstIds.length) // 节点是否开始

watch(() => props.id, r, { immediate: true })

function r () {
  rWorkflowNodesWithRaw({
    id: props.id,
  }).then(res => {
    model.value = res.raws
    bindState.currentNodeInstIds = res.raws.currentNodeInstIds
    flowData.value = res.info
    if (nodeModel.value.id) {
      const node = res.raws.nodes?.find(item => item.id === nodeModel.value.id)
      if (node)
        nodeModel.value = node as NodeModel<User>
    }
  })
}

const operBindSuccess = () => {
  r()
}
const approvalSuccess = () => {
  r()
}


/**
 * 选中节点事件
 * @param e 
 */
const nodeSelectChange = (e: any) => {
  if (e.target) {
    const m = e.target.getModel()
    nodeModel.value = cloneDeep(m)
  } else {
    nodeModel.value = {} as any
  }
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
.editor-x :deep(.el-form-item .el-form-item ){
  margin-bottom: 18px;
}
</style>
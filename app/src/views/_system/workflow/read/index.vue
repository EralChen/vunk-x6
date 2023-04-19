<template>
  <PageOver>
    <SkAppCard class="h-full" header="节点详情">
      <div class="editor-x" sk-flex="row">
        <div class="editor">
          <ZzG6Editor :selectNodeId="nodeModel.id" :mode="'default'" :model-value="model"
            @nodeselectchange="nodeSelectChange" :active-tab-name="'expend'">
            
            <template #form>
              <el-tab-pane label="扩展属性" name="expend">
                <ElScrollbar>
                  <ElForm label-position="top">
                    <BindOpers :node-model="nodeModel" @bind-success="r"></BindOpers>
                    <ElFormItem label="开始流程" v-show="!isFlowStart">
                      <el-button type="primary" @click="doRunWorkflow">运行</el-button>
                    </ElFormItem>
                    <BindAssitsOpers :node-model="nodeModel" :currentNodeInstIds="bindState.currentNodeInstIds"
                      @bind-success="r" :isFlowStart="isFlowStart"></BindAssitsOpers>
                    <Approval :flowId="id" :node-model="nodeModel" :currentNodeInstIds="bindState.currentNodeInstIds"
                      :isFlowStart="isFlowStart" @approvalSuccess="r"></Approval>
                  </ElForm>
                </ElScrollbar>
              </el-tab-pane>
            </template>
          </ZzG6Editor>
        </div>
      </div>
    </SkAppCard>
  </PageOver>
</template>

<script setup lang="tsx">
import { rWorkflowNodesWithRaw, runWorkflow, Workflow } from '@skzz-platform/api/system/workflow'
import { computed, nextTick, reactive, ref, shallowRef, watch } from 'vue'
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
    } else {      
      nextTick(() => {
        nodeModel.value = res.raws.nodes![0] as NodeModel<User>
      })
    }
  })
}

/**
 * 选中节点事件
 * @param e 
 */
const nodeSelectChange = (e: any) => {
  if (e.target && e.select) {
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
  width: 100%;
}

.editor-x :deep(.el-form-item .el-form-item) {
  margin-bottom: 18px;
}
</style>
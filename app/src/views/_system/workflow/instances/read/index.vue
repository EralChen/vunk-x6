<template>
  <PageOver>
    <SkAppCard class="h-full" header="实例详情">
      <div class="editor-x" sk-flex="row">
        <div class="editor">
          <ZzG6Editor :selectNodeId="nodeModel.id" :mode="'default'" :model-value="model"
            @nodeselectchange="nodeSelectChange" :active-tab-name="'approval'" >
            <template #form>
              <el-tab-pane label="审批" name="approval">
                <ElScrollbar>
                  <ElForm label-position="top" :disabled="true">
                    <BindOpers :node-model="nodeModel" :disabled="true"></BindOpers>
                  </ElForm>
                  <ElForm label-position="top">
                    <BindAssitsOpers :node-model="nodeModel" :currentNodeInstIds="bindState.currentNodeInstIds"
                      @bind-success="r" :isFlowStart="isFlowStart"></BindAssitsOpers>
                    <Approval :itemId="flowData.itemId" :flowId="flowId" :node-model="nodeModel" :currentNodeInstIds="bindState.currentNodeInstIds"
                      :isFlowStart="isFlowStart" @approvalSuccess="approvalSuccess" :form-table="flowData.formTable"></Approval>
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
import { rWorkflowNodeRaw, rInstanceList, FlowNodeInstance } from '@skzz-platform/api/system/workflow'
import { computed, nextTick, reactive, ref, shallowRef, watch } from 'vue'
import { SkAppCard } from '@skzz/platform'
import ZzG6Editor from '@/components/ZzG6Editor/index.vue'
import BindAssitsOpers from './bind-assist-opers/index.vue'
import Approval from './approval/index.vue'
import { cloneDeep } from 'lodash'
import { NodeModel } from '@zzg6/flow/components/editor/src/types'
import BindOpers from '../../bind-opers/index.vue'
import { usePostQueryU } from '@skzz-platform/composables'


const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  flowId: {
    type: String,
    required: true,
  },
})


const nodeModel = ref({} as NodeModel)
// 流程节点数据
const model = shallowRef({})
// 流程详情
const flowData = ref({} as FlowNodeInstance) 
const bindState = reactive({
  currentNodeInstIds: [] as string[],
})
// 节点是否开始
const isFlowStart = computed(() => flowData.value.status !== 10)
const { postQueryU } = usePostQueryU()

watch(() => props.id, r, { immediate: true })

async function r () {
  const r = await rInstanceList(undefined, undefined, props.id)
  const rows = r.rows[0]
  const raws = await rWorkflowNodeRaw({itemId: rows.itemId, flowInstId: props.id})

  model.value = raws
  bindState.currentNodeInstIds = raws.currentNodeInstIds
  flowData.value = rows
  if (nodeModel.value.id) {
    const node = raws.nodes?.find(item => item.id === nodeModel.value.id)
    if (node)
      nodeModel.value = node as NodeModel
  } else {
    nextTick(() => {
      if (raws.nodes)
        nodeModel.value = raws.nodes[0] as NodeModel
    })
  }
}

function approvalSuccess () {
  // r()
  postQueryU()
}

/**
 * 选中节点事件(点击触发，或者设置selectNodeId触发)
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
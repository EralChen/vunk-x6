<template>
  <PageOver>
    <SkAppCard class="h-full" header="节点详情">
      <div class="editor-x" sk-flex="row">
        <div class="editor">
          <ZzG6Editor :selectNodeId="nodeModel.id" :mode="'default'" :model-value="model"
            @nodeselectchange="nodeSelectChange" :active-tab-name="'expend'" :form-id="flowData.formId">
            
            <el-button class="absolute top-14px right-14px z-100" type="primary" @click="doRunWorkflow">生成实例</el-button>

            <template #form>
              <el-tab-pane label="扩展属性" name="expend">
                <ElScrollbar>
                  <ElForm label-position="top">
                    <BindOpers :node-model="nodeModel" @bind-success="r"></BindOpers>
                  </ElForm>
                </ElScrollbar>
              </el-tab-pane>
            </template>
          </ZzG6Editor>
        </div>
      </div>
    </SkAppCard>
  </PageOver>
  <SkAppDialog v-model="startShow" title="运行流程">
    <GenInstance :tableData="tableData" :flowData="flowData" :itemId="flowData.itemId" @success="genSuccess"></GenInstance>
  </SkAppDialog>
</template>

<script setup lang="tsx">
import { rWorkflowNodesWithRaw, Workflow } from '@skzz-platform/api/system/workflow'
import { nextTick, reactive, ref, shallowRef, watch } from 'vue'
import { SkAppCard } from '@skzz/platform'
import ZzG6Editor from '@/components/ZzG6Editor/index.vue'
import BindOpers from '../bind-opers/index.vue'
import { cloneDeep } from 'lodash'
import { NodeModel } from '@zzg6/flow/components/editor/src/types'
import { SkAppDialog } from '@skzz/platform'
import GenInstance from './gen-instance/index.vue'
import { NodeConfig } from '@antv/g6'
import { usePostQueryU } from '@skzz-platform/composables'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const tableData = ref<NodeConfig[]>([])
const startShow = ref(false)
const nodeModel = ref({} as NodeModel)
// 流程节点数据
const model = shallowRef({})
// 流程详情数据
const flowData = ref({} as Workflow)
const bindState = reactive({
  currentNodeInstIds: [] as string[],
})

const { postQueryU } = usePostQueryU()

watch(() => props.id, r, { immediate: true })

function r () {
  rWorkflowNodesWithRaw({
    id: props.id,
  }).then(res => {
    tableData.value = res.raws.nodes || []
    model.value = res.raws
    bindState.currentNodeInstIds = res.raws.currentNodeInstIds
    flowData.value = res.info
    if (nodeModel.value.id) {
      const node = res.raws.nodes?.find(item => item.id === nodeModel.value.id)
      if (node)
        nodeModel.value = node as NodeModel
    } else {
      nextTick(() => {
        if (res.raws.nodes)
          nodeModel.value = res.raws.nodes[0] as NodeModel
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
  startShow.value = true
}

/**
 * 流程运行成功
 */
const genSuccess = () => {
  startShow.value = false
  postQueryU()
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
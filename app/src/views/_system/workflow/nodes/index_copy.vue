<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { rWorkflowNodes, WorkflowNode, dWorkflowNodes, cuWorkflowNode, bindOpersToNode, cWorkflowNodeByJson } from '@skzz-platform/api/system/workflow'
import { SkAppDialog } from '@skzz/platform'
import CuForm from './cu-form/index.vue'
import { setData, VkDuplex } from '@vunk/core'
import { pickObject } from '@vunk/core/shared/utils-object'
import { SkUserTablesSelect } from '@skzz-platform/components/user-tables-select'

type Row = Partial<WorkflowNode>

const props = defineProps({
  flowId: {
    type: String,
    required: true,
  },
})

const data = ref<WorkflowNode[]>([])

const bindState = reactive({
  nodeId: '',
  data: [] as WorkflowNode[],
})
const jsonLoadState = reactive({
  visible: false,
  data: '{"nodes":[{"id":"zzg6-zzRect-0.331608056656901741679880010746","x":120,"y":21,"type":"zzRect","style":{"active":{"fill":"rgb(247, 250, 255)","stroke":"rgb(95, 149, 255)","lineWidth":2,"shadowColor":"rgb(95, 149, 255)","shadowBlur":10},"selected":{"fill":"rgb(255, 255, 255)","stroke":"rgb(95, 149, 255)","lineWidth":4,"shadowColor":"rgb(95, 149, 255)","shadowBlur":10,"text-shape":{"fontWeight":500}},"highlight":{"fill":"rgb(223, 234, 255)","stroke":"#4572d9","lineWidth":2,"text-shape":{"fontWeight":500}},"inactive":{"fill":"rgb(247, 250, 255)","stroke":"rgb(191, 213, 255)","lineWidth":1},"disable":{"fill":"rgb(250, 250, 250)","stroke":"rgb(224, 224, 224)","lineWidth":1}},"description":"","label":"开始节点","class":"","anchorPoints":[[0.5,0],[1,0.5],[0.5,1],[0,0.5]],"layoutOrder":0,"_order":0},{"id":"zzg6-zzRect-0.081158092120446221679880017945","x":460,"y":21,"type":"zzRect","style":{"active":{"fill":"rgb(247, 250, 255)","stroke":"rgb(95, 149, 255)","lineWidth":2,"shadowColor":"rgb(95, 149, 255)","shadowBlur":10},"selected":{"fill":"rgb(255, 255, 255)","stroke":"rgb(95, 149, 255)","lineWidth":4,"shadowColor":"rgb(95, 149, 255)","shadowBlur":10,"text-shape":{"fontWeight":500}},"highlight":{"fill":"rgb(223, 234, 255)","stroke":"#4572d9","lineWidth":2,"text-shape":{"fontWeight":500}},"inactive":{"fill":"rgb(247, 250, 255)","stroke":"rgb(191, 213, 255)","lineWidth":1},"disable":{"fill":"rgb(250, 250, 250)","stroke":"rgb(224, 224, 224)","lineWidth":1}},"description":"","label":"结束节点","class":"","anchorPoints":[[0.5,0],[1,0.5],[0.5,1],[0,0.5]],"huiqian":1,"layoutOrder":0,"_order":0}],"edges":[{"source":"zzg6-zzRect-0.331608056656901741679880010746","target":"zzg6-zzRect-0.081158092120446221679880017945","style":{"active":{"stroke":"rgb(95, 149, 255)","lineWidth":1},"selected":{"stroke":"rgb(95, 149, 255)","lineWidth":2,"shadowColor":"rgb(95, 149, 255)","shadowBlur":10,"text-shape":{"fontWeight":500}},"highlight":{"stroke":"rgb(95, 149, 255)","lineWidth":2,"text-shape":{"fontWeight":500}},"inactive":{"stroke":"rgb(234, 234, 234)","lineWidth":1},"disable":{"stroke":"rgb(245, 245, 245)","lineWidth":1},"endArrow":{"path":"M 0,0 L 8,4 L 8,-4 Z","fill":"#e2e2e2"},"radius":20,"stroke":"#000"},"size":2,"color":"#000","labelCfg":{"autoRotate":true},"id":"edge-0.187535099745061331679880018820","startPoint":{"x":170.5,"y":21,"anchorIndex":1},"endPoint":{"x":409.5,"y":21,"anchorIndex":3},"controlPoints":[{"x":290,"y":21}]}],"combos":[]}',
})

watch(() => props.flowId, r, { immediate: true })
function r () {
  rWorkflowNodes({
    flowId: props.flowId,
  }).then((res) => {
    data.value = res.nodes
  })
}

function preJsonLoad () {
  jsonLoadState.visible = true
}
function jsonLoad () {
  cWorkflowNodeByJson(props.flowId, jsonLoadState.data).then(() => {
    r()
    jsonLoadState.visible = false
  })
}
function preBind (row: Row) {
  bindState.nodeId = row.id || ''
}
function bindOpers () {
  bindOpersToNode(
    bindState.nodeId,
    bindState.data.map(item => item.id),
  ).then(() => {
    r()
    bindState.nodeId = ''
  })
}

</script>
<template>
  <PageOver>

    <VkDuplex class="h-full" :gap="'var(--gap-page)'" gap-main-x>
      <template #one>
        <div sk-flex="row-between-center">
          <span></span>
          <div>
            <ElButton type="primary" @click="preJsonLoad">
              导入
            </ElButton>
          </div>

        </div>
      </template>

      <ElScrollbar>
        <div sub:mt-page>

          <el-descriptions v-for="(item, index) of data" :key="index" :title="item.label" border>
            <template #extra>
              <el-button type="primary" @click="preBind(item)">绑定</el-button>

            </template>

            <el-descriptions-item v-for="(v, k) of pickObject(item, {
              excludes: ['style']
            })" :key="k" :label="k + ''">
              {{ v }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </ElScrollbar>

    </VkDuplex>

    <SkAppDialog :modelValue="!!bindState.nodeId" @update:modelValue="bindState.nodeId = ''" :title="'绑定操作人'">
      <SkUserTablesSelect v-model="bindState.data" class="h-40em"></SkUserTablesSelect>

      <template #footer>
        <el-button size="large" type="primary" @click="bindOpers">确定</el-button>
      </template>

    </SkAppDialog>

    <SkAppDialog v-model="jsonLoadState.visible" :title="'json导入'">
      <ElInput :type="'textarea'" v-model="jsonLoadState.data" :rows="25">
      </ElInput>

      <template #footer>
        <ElButton type="primary" size="large" @click="jsonLoad">确定</ElButton>
      </template>
    </SkAppDialog>

  </PageOver>
</template>

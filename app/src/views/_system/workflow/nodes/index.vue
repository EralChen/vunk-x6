<template>
  <PageOver>
    <ZzEditor :model-value="editData" @update:data="e => backData = e" :id-gen-fn="snowFlake">
      <template #toolbar>
        <li>
          <el-button type="primary" link size="small" @click="jsonLoad">
            保存
          </el-button>
        </li>
      </template>
    </ZzEditor>
  </PageOver>
</template>

<script setup lang="ts">
import { ZzEditor } from '@zzg6/flow'
import {  shallowRef, watch } from 'vue'
import { rWorkflowNodes, WorkflowNode, cWorkflowNodeByJson, WorkflowData } from '@skzz-platform/api/system/workflow'
import { GraphData, TreeGraphData } from '@antv/g6'
import { snowFlake } from '@skzz-platform/api/basic'

type Row = Partial<WorkflowNode>

// expendForm([{
//   component: registerTest,
//   type: 'VkfRegisterTest',
// }])
// extendNodeFormMap(MaterialNode.zzRect, [{
//   templateType: 'VkfRegisterTest',
//   prop: 'peopleNode',
//   label: '操作人',
// }])

const props = defineProps({
  flowId: {
    type: String,
    required: true,
  },
})

const editData = shallowRef({} as WorkflowData)
const backData = shallowRef({} as GraphData | TreeGraphData)

watch(() => props.flowId, r, { immediate: true })
function r () {
  rWorkflowNodes({
    flowId: props.flowId,
  }).then((res) => {
    editData.value = res
  })
}

function jsonLoad () {
  cWorkflowNodeByJson(props.flowId, backData.value)
}
</script>

<style lang="scss" scoped>
:deep(.sk-g6-minimap){
  right: unset;
}
</style>
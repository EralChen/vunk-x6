<template>
  <PageOver>
    <ZzG6Editor :model-value="editData" @update:data="e => backData = e" :id-gen-fn="snowFlake" :form-id="formId">
      <template #toolbar>
        <li>
          <el-button type="primary" link size="small" @click="jsonLoad">
            保存
          </el-button>
        </li>
      </template>
    </ZzG6Editor>
  </PageOver>
</template>

<script setup lang="ts">
import { rWorkflowNodes, cWorkflowNodeByJson, WorkflowData } from '@skzz-platform/api/system/workflow'
import ZzG6Editor from '@/components/ZzG6Editor/index.vue'
import { ref, shallowRef, watch } from 'vue'
import { GraphData, TreeGraphData } from '@antv/g6'
import { snowFlake } from '@skzz-platform/api/basic'

let isEdit = true
const formId = ref('')
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
    if (!res.nodes.length) {
      isEdit = false
    }
    editData.value = res
  })
}

function jsonLoad () {
  cWorkflowNodeByJson(props.flowId, backData.value, isEdit)
    .then(() => {
      isEdit = true
    })
}


// onBeforeRouteLeave((to, from, next) => {
//   console.log(to, from)
// })
</script>

<style lang="scss" scoped>
:deep(.sk-g6-minimap){
  right: unset;
}
</style>
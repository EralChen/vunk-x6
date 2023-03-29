<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { rWorkflow, rWorkflowNodeRaw, rWorkflowNodesWithRaw, Workflow, WorkflowData } from '@skzz-platform/api/system/workflow'
import { SkAppCard } from '@skzz/platform'
import G6Viewer from './g6-viewer/index.vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const rState = reactive({
  info: {} as Workflow,
  data: {} as WorkflowData,
})
watch(() => props.id, r, { immediate: true })

function r () {
  rWorkflowNodesWithRaw({
    id: props.id,
  }).then(res => {
    rState.info = res.info
    rState.data = res.data
  })
}
</script>
<template>
  <PageOver>
    <SkAppCard :header="rState.info.name" class="h-full">

        <div gap-main-x sub:mt-page h-full>
          <G6Viewer :data="rState.data"></G6Viewer>
        </div>

    </SkAppCard>
  </PageOver>
</template>

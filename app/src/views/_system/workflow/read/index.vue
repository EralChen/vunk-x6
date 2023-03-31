<template>
  <PageOver>
    <SkAppCard class="h-full">
      <div class="editor-x" sk-flex="row">
        <div class="editor">
          <ZzEditor :mode="'default'" :model-value="model" @nodeselectchange="nodeSelectChange"></ZzEditor>
        </div>
        <div class="form"></div>
      </div>
    </SkAppCard>

  </PageOver>
</template>

<script setup lang="ts">
import { ZzEditor } from '@zzg6/flow'
import { rWorkflowNodesWithRaw, Workflow, WorkflowData } from '@skzz-platform/api/system/workflow'
import { reactive, shallowRef, watch } from 'vue'
import { SkAppCard } from '@skzz/platform'


const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const model = shallowRef({})
const rState = reactive({
  info: {} as Workflow,
  data: {} as WorkflowData,
})
watch(() => props.id, r, { immediate: true })

function r () {
  rWorkflowNodesWithRaw({
    id: props.id,
  }).then(res => {
    model.value = res.data
  })
}

const nodeSelectChange = (e: any) => {
  if (e.target)
    console.log(e.target.getModel())
}

</script>

<style lang="scss" scoped>
.editor-x{
  height: 100%;
}
.editor {
  width: 80%;
}

.form {
  width: 20%;
  border: 1px solid var(--el-border-color);
}
</style>
<template>
  <ElDialog
    v-model="dialogVisible"
    :append-to-body="true"
    title="选择退回节点"
  >
    <div style="height: 50vh;">
      <ZzG6Editor
        :mode="'preview'"
        :model-value="model"
        @nodeselectchange="nodeSelectChange"
      ></ZzG6Editor>
    </div>
    <template #footer>
      <ElButton
        type="primary"
        @click="$emit('besure')"
      >
        确定
      </ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import ZzG6Editor from '@/components/ZzG6Editor/index.vue'
import { GraphData, IG6GraphEvent } from '@antv/g6'
import { rInstanceList, rWorkflowNodeRaw } from '@skzz-platform/api/system/workflow'
import { PropType, computed, ref, watch } from 'vue'

const props = defineProps({
  flowInstId: {
    type: String,
    default: '',
  },
  visible: {
    type: Boolean,
    default: false,
  },
  selectedNode: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
})

const emit = defineEmits(['update:visible', 'update:selectedNode', 'besure'])
const model = ref({} as any)

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val),
})

const nodeSelectChange = (e: IG6GraphEvent) => {
  const selectedItems = e.selectedItems as GraphData
  emit('update:selectedNode', selectedItems.nodes)
}

async function r () {
  if (!props.flowInstId) return
  const res = await rInstanceList(undefined, undefined, props.flowInstId)
  const rows = res.rows[0]
  const raws = await rWorkflowNodeRaw({
    itemId: rows.itemId,
    flowInstId: props.flowInstId,
  })

  model.value = raws as GraphData
}

watch(() => props.flowInstId, r, { immediate: true })

defineExpose({
  r,
})
</script>

<style scoped>

</style>
<template>
  <ElDialog
    v-model="dialogVisible"
    title="选择退回节点"
  >
    <div style="height: 50vh;">
      <ZzG6Editor
        :mode="'preview'"
        :model-value="props.modelValue"
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
import { useVModel } from '@vueuse/core'
import { PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object as PropType<GraphData>,
    default: () => ({}),
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

const dialogVisible = useVModel(props, 'visible', emit)

const nodeSelectChange = (e: IG6GraphEvent) => {
  const selectedItems = e.selectedItems as GraphData
  emit('update:selectedNode', selectedItems.nodes)
}

</script>

<style scoped>

</style>
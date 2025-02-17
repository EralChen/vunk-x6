<script lang="ts" setup>
import { useModelComputed } from '@vunk/core/composables'
import { useGraph } from '@vunk-x6/composables'
import { ElDrawer } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  shape: {
    type: String,
    required: true,
  },
})
const emit = defineEmits({
  'update:modelValue': null,
})
const graph = useGraph()
const appendTo = graph.container.parentElement as HTMLDivElement

const modelValue = useModelComputed({
  key: 'modelValue',
  default: false,
}, props, emit)

function onSelectionChanged () {
  const selectedCells = graph.getSelectedCells()
  const last = selectedCells.at(-1)
  modelValue.value = last?.shape === props.shape
}
graph.on('selection:changed', onSelectionChanged)
graph.on('node:click', onSelectionChanged)
</script>

<template>
  <ElDrawer
    v-model="modelValue"
    :append-to="appendTo"
    class="vk-node-drawer"
    modal-class="vk-node-drawer__modal"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :size="300"
  >
    <template #header>
      <div class="vk-register-start-node__header">
        <img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-Start-v2.jpg" />
        <span>开始</span>
      </div>
    </template>
  </ElDrawer>
</template>

<style>
.vk-node-drawer__modal{

  position: absolute;
  background-color: transparent;
  pointer-events: none;

}

.vk-node-drawer__modal .el-drawer__header {
  margin-bottom: 10px;

}
.vk-node-drawer__modal .el-drawer {
  --el-drawer-padding-primary: 10px;
}
.vk-node-drawer__modal > * {
  pointer-events: initial;
}
</style>

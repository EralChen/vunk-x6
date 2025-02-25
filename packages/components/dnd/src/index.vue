<script lang="ts">
import type { Cell, Graph } from '@antv/x6'
import type { Ref } from 'vue'
import { Dnd } from '@antv/x6-plugin-dnd'
import { useGraph } from '@vunk-x6/composables'
import { defineComponent, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkDnd',
  props,
  emits,
  setup (props, { emit }) {
    const graph = useGraph()
    const dndRef = ref() as Ref<HTMLDivElement>

    let dnd: Dnd | null = null
    const ready = ref(false)

    onMounted(() => {
      // 初始化dnd实例
      dnd = new Dnd({
        target: graph,
        dndContainer: dndRef.value,
        ...props.defaultOptions,
      })

      // 提供dnd实例给其他组件使用
      provide('vk_dnd', dnd)
      ready.value = true
    })

    onBeforeUnmount(() => {
      if (dnd) {
        dnd.off('dnd:start')
        dnd.off('dnd:end')
        dnd = null
      }
    })

    return {
      ready,
      dndRef,
    }
  },
})
</script>

<template>
  <div ref="dndRef" class="vk-dnd">
    <div v-if="ready" class="vk-dnd__content">
      <div
        class="vk-dnd__item"
        data-type="VkRegisterLlmNode"
      >
        大模型
      </div>
    </div>
  </div>
</template>

<style>
.vk-dnd {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 300px;
  height: 100%;
  padding: 16px;
  background: #f5f5f5;
}

.vk-dnd__content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vk-dnd__item {
  cursor: move;
  border: 1px solid #d9d9d9;
}
</style>

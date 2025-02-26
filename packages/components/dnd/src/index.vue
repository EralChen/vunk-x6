<script lang="ts">
import type { Node } from '@antv/x6'
import type { __VkTemplatesDefault } from '@vunk-x6/components/templates-default'
import type { Ref } from 'vue'
import { Dnd } from '@antv/x6-plugin-dnd'
import { VkRenderer } from '@vunk/core/components/renderer'
import { Deferred } from '@vunk/core/shared/utils-promise'
import { VkDndItem } from '@vunk-x6/components/dnd-item'
import { VkTemplatesDefault } from '@vunk-x6/components/templates-default'
import { useGraph } from '@vunk-x6/composables'
import { defineComponent, onBeforeUnmount, onMounted, provide, ref, shallowRef } from 'vue'
import { emits, props } from './ctx'

type NodeSourceItem = __VkTemplatesDefault.SourceItem

export default defineComponent({
  name: 'VkDnd',
  components: {
    VkDndItem,
    VkRenderer,
    VkTemplatesDefault,
  },
  props,
  emits,
  setup (props, { emit }) {
    const graph = useGraph()
    const dndNodeRef = ref() as Ref<HTMLDivElement>

    const dnd = shallowRef() as Ref<Dnd>
    const ready = ref(false)

    const dndNodeSource = ref([]) as Ref<NodeSourceItem[]>

    onMounted(() => {
      // 初始化dnd实例
      dnd.value = new Dnd({
        target: graph,
        dndContainer: dndNodeRef.value,
        ...props.defaultOptions,
      })

      dndNodeRef.value.addEventListener('mousedown', (e) => {
        // 如果拖拽的是.vk-dnd-item，则获取其data-type
        const path = e.composedPath()
        const dndItem = path.find((el) => {
          if (el instanceof HTMLElement) {
            return el.classList.contains('vk-dnd-item')
          }
          return false
        }) as HTMLDivElement
        if (!dndItem)
          return
        const type = dndItem.getAttribute('data-type')
        if (!type)
          return

        const nodeDef = new Deferred<Node>()
        const nodeSourceItem: NodeSourceItem = {
          templateType: type as never,
          orphan: true,
          onLoad: ({ node }) => {
            nodeDef.resolve(node)
          },
          width: 300,
          height: 200,
        }
        dndNodeSource.value.push(nodeSourceItem)
        nodeDef.promise.then((node) => {
          dnd.value.start(node, e)
        })
      })

      // 提供dnd实例给其他组件使用
      provide('vk_dnd', dnd.value)
      ready.value = true
    })

    onBeforeUnmount(() => {
      dnd.value.off('dnd:start')
      dnd.value.off('dnd:end')
    })

    return {
      ready,
      dndNodeRef,
      dndNodeSource,
    }
  },
})
</script>

<template>
  <div ref="dndNodeRef" class="vk-dnd">
    <div v-if="ready" class="vk-dnd__content">
      <VkDndItem shape="VkRegisterLlmNode">
        大模型
      </VkDndItem>
    </div>

    <VkRenderer :source="dndNodeSource">
      <VkTemplatesDefault></VkTemplatesDefault>
    </VkRenderer>
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

.vk-dnd-item {
  cursor: move;
  border: 1px solid #d9d9d9;
}
</style>

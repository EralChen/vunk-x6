<script lang="ts">
import type { Node } from '@antv/x6'
import type { __VkTemplatesDefault } from '@vunk-x16/components/templates-default'
import type { Ref } from 'vue'
import { Dnd } from '@antv/x6-plugin-dnd'
import { VkTemplatesDefault } from '@vunk-x16/components/templates-default'
import { useGraph } from '@vunk-x16/composables'
import { VkRenderer } from '@vunk/core/components/renderer'
import { Deferred } from '@vunk/core/shared/utils-promise'
import { isNotEmptyObject } from '@vunk/shared/object'
import { defineComponent, markRaw, onBeforeUnmount, onMounted, provide, ref, shallowRef } from 'vue'
import { emits, props } from './ctx'

const instanceKey = Symbol('instanceKey')
type NodeSourceItem = __VkTemplatesDefault.SourceItem & {
  [instanceKey]?: Node
}

export default defineComponent({
  name: 'VkDnd',
  components: {
    VkRenderer,
    VkTemplatesDefault,
  },
  props,
  emits,
  setup (props) {
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
        getDragNode: (node) => {
          const nNode = node.clone({ keepId: true })
          return nNode
        },
        getDropNode: (node) => {
          const source = dndNodeSource.value
            .find((item) => {
              if (!item[instanceKey]) {
                throw new Error('Instance is not found')
              }
              return item[instanceKey].id === node.id
            }) as unknown as { [instanceKey]: Node }

          return source[instanceKey]
        },
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
        const type = dndItem.dataset.type
        if (!type)
          return

        const data = JSON.parse(dndItem.dataset.data ?? '{}')

        const nodeDef = new Deferred<Node>()

        const nodeSourceItem: NodeSourceItem = {
          templateType: type as never,
          orphan: true,
          onLoad: ({ node }) => {
            nodeDef.resolve(node)
            nodeSourceItem[instanceKey] = markRaw(node)
          },
          width: 300,
          height: 200,
          data: isNotEmptyObject(data) ? data : undefined,
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
      <slot></slot>
    </div>

    <VkRenderer :source="dndNodeSource">
      <VkTemplatesDefault></VkTemplatesDefault>
    </VkRenderer>
  </div>
</template>

<style>
.vk-dnd-item {
  cursor: move;
}
</style>

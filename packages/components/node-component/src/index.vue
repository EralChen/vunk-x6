<script lang="tsx">
import type { Node } from '@antv/x6'
import { Graph } from '@antv/x6'
import { register } from '@antv/x6-vue-shape'
import { useResizeObserver } from '@vueuse/core'
import { isEmptyObject } from '@vunk/shared/object'
import { useGraphEmitter } from '@vunk-x6/composables'
import { cloneDeep } from 'lodash-es'
import { defineComponent, onBeforeUnmount, onUnmounted, ref, watchEffect } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkNodeComponent',
  props,
  emits,
  setup (props, { slots }) {
    register({
      shape: props.shape,
      component: {
        props: {
          node: null,
          graph: null,
        },
        setup (nodeProps: { node: Node, graph: Graph }) {
          const { graphEmitterOn } = useGraphEmitter()

          const initData = (function () {
            let data = nodeProps.node.getData()
            if (!data || isEmptyObject(data)) {
              data = props.defaultInstanceData ?? {}
            }
            return cloneDeep(data)
          })()

          const theData = ref(initData)

          watchEffect(() => {
            nodeProps.node.setData(theData.value, {
              overwrite: true,
            })
          })
          /* 当 node.data 改变时, 同步到响应式数据 */
          watchEffect(() => {
            nodeProps.node.setData(theData.value, {
              overwrite: true,
            })
          })
          const syncData = () => {
            theData.value = nodeProps.node.getData()
          }
          nodeProps.node.on('change:data', syncData)
          onBeforeUnmount(() => {
            nodeProps.node.off('change:data', syncData)
          })
          /* endof 当 node.data 改变时, 同步到响应式数据 */

          const graph = nodeProps.graph
          const isActive = ref(false)
          const handleActive = () => {
            isActive.value = graph.getSelectedCells()
              .includes(nodeProps.node)
          }
          graph.on('selection:changed', handleActive)
          onBeforeUnmount(() => {
            graph.off('selection:changed', handleActive)
          })

          graphEmitterOn('node:mousedown', (event) => {
            // 点击时将节点提升到最上层
            if (event.node.id === nodeProps.node.id) {
              nodeProps.node.toFront()
            }
          })

          const renderSlot = () => {
            return slots.default?.({
              node: nodeProps.node,
              attrs: nodeProps.node.attrs,
              graph: nodeProps.graph,
              data: theData.value,
              isActive: isActive.value,
            })
          }

          if (!props.autoSize) {
            return renderSlot
          }
          const containerRef = ref<HTMLElement>()
          const setContainerRef = e => containerRef.value = e
          useResizeObserver(containerRef, (entries) => {
            const { width, height } = entries[0].contentRect
            nodeProps.node.size({
              width,
              height,
            })
          })

          return () => (
            <div
              ref={setContainerRef}
              class={
                `vk-node-component-size-container ${
                  props.autoSizeContainerClass
                } ${
                  isActive.value
                    ? 'is-active'
                    : ''
                }`
              }
            >

              { renderSlot() }

            </div>
          )
        },
      },
      ports: {
        groups: props.groups,
        items: props.items,
      },
      data: props.data,
    })

    onUnmounted(() => {
      Graph.unregisterNode(props.shape)
    })
    return () => null
  },
})
</script>

<style>
.vk-node-component-size-container{
  width: max-content;

}
.vk-node-component-size-container.is-active::after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 3px solid var(--el-color-warning, #ff9900);
  pointer-events: none;
  border-radius: 4px;
}
</style>

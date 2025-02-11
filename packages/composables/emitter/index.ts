import type { __VkGraph } from '@vunk-x6/components/graph'
import { inject, onDeactivated } from 'vue'

export function useGraphEmitter () {
  const emitter = inject<__VkGraph.GraphEmitter | null>('vk_graph_emitter', null)

  if (!emitter) {
    throw new Error('GraphEmitter is not provided')
  }

  /**
   * 增强的 on 方法，在组件卸载时自动移除事件监听
   * @param event
   * @param callback
   */
  const graphEmitterOn: typeof emitter.on = (event, callback) => {
    emitter.on(event, callback)
    onDeactivated(() => {
      emitter.off(event, callback)
    })
  }

  return {
    graphEmitterOn,
    emitter,
  }
}

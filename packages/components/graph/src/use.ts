import type { __VkGraph } from '@vunk-x6/components/graph'
import type { MousewheelGuardClassContext } from './types'
import { inject, onBeforeUnmount, onDeactivated, provide, ref } from 'vue'

export function initMousewheelGuardClass () {
  const mousewheelGuardClass = ref<string[]>([])

  const getMousewheelGuardClass = () => {
    return mousewheelGuardClass.value
  }

  const removeMousewheelGuardClass = (className: string) => {
    const index = mousewheelGuardClass.value.indexOf(className)
    if (index !== -1) {
      mousewheelGuardClass.value.splice(index, 1)
    }
  }

  const addMousewheelGuardClass = (className: string) => {
    mousewheelGuardClass.value.push(className)
    onBeforeUnmount(() => {
      removeMousewheelGuardClass(className)
    })
  }
  const ctx = {
    removeMousewheelGuardClass,
    addMousewheelGuardClass,
    getMousewheelGuardClass,
  } as MousewheelGuardClassContext
  provide('vk_mousewheel_guard_class', ctx)
  return ctx
}

export function useMousewheelGuardClass () {
  const ctx = inject('vk_mousewheel_guard_class') as MousewheelGuardClassContext
  if (!ctx) {
    throw new Error('useMousewheelGuardClass must be used within a provider')
  }
  return ctx
}

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

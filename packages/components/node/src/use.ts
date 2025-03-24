import type { Cell } from '@antv/x6'
import type { NormalObject } from '@vunk/shared'
import type { MaybeRef } from 'vue'
import { isEmptyObject } from '@vunk/shared/object'
import { computed, nextTick, onBeforeUnmount, ref, unref, watch } from 'vue'

/**
 * 获取具有响应式的节点数据
 */
export function useNodeData<T extends NormalObject = NormalObject> (
  nodeRef: MaybeRef<Cell | undefined>,
  defaultValue?: T,
) {
  const nodeDataEffect = ref(0)
  const track = () => nodeDataEffect.value
  const nodeData = computed<T>({
    get: () => {
      track()
      return unref(nodeRef)?.getData() ?? {}
    },
    set: (value) => {
      unref(nodeRef)?.setData(value)
    },
  })

  watch(() => unref(nodeRef), (nNode, oNode) => {
    if (oNode) {
      oNode.off('change:data', onDataChanged)
    }

    if (nNode) {
      init()
    }
  }, { immediate: true })

  onBeforeUnmount(() => {
    unref(nodeRef)?.off('change:data', onDataChanged)
  })

  function init () {
    const node = unref(nodeRef)
    const initData = node?.getData()
    if (
      defaultValue && (
        initData === undefined
        || isEmptyObject(initData)
      )
    ) {
      nodeData.value = { ...defaultValue }
      nextTick(() => { //  nodeData.value 设置后, node 中的data 会在下一次渲染中被包装成响应式对象
        nodeDataEffect.value++
      })
    }
    if (node) {
      node.on('change:data', onDataChanged)
    }
  }

  function onDataChanged () {
    unref(nodeRef) && (nodeDataEffect.value++)
  }

  return {
    nodeData,
  }
}

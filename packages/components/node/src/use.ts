import type { Cell } from '@antv/x6'
import type { NormalObject } from '@vunk/shared'
import type { MaybeRef } from 'vue'
import { nextTick, onBeforeUnmount, ref, unref, watch } from 'vue'

/**
 * 获取具有响应式的节点数据
 */
export function useNodeData<T extends NormalObject = NormalObject> (nodeRef: MaybeRef<Cell | undefined>) {
  /* init */
  const nodeData = ref({} as T)
  const initNode = unref(nodeRef)
  if (initNode) {
    Object.assign(nodeData.value, initNode.getData())
    initNode.on('change:data', onDataChanged)
  }
  /* endof init */

  watch(nodeData, () => {
    const currentNode = unref(nodeRef)
    if (!currentNode) {
      return
    }

    currentNode.off('change:data', onDataChanged)

    currentNode.setData({ ...nodeData.value }, {
      overwrite: true,
    })
    nextTick(() => {
      currentNode.on('change:data', onDataChanged)
    })
  }, { deep: true })

  watch(() => unref(nodeRef), (nNode, oNode) => {
    if (oNode) {
      oNode.off('change:data', onDataChanged)
    }

    if (nNode) {
      nodeData.value = nNode.getData() as T
      nNode.on('change:data', onDataChanged)
    }
  })

  onBeforeUnmount(() => {
    const currentNode = unref(nodeRef)
    if (currentNode) {
      currentNode.off('change:data', onDataChanged)
    }
  })

  function onDataChanged () {
    const currentNode = unref(nodeRef)
    if (!currentNode) {
      return
    }
    Object.assign(nodeData.value, currentNode.getData())
  }

  return {
    nodeData,
  }
}

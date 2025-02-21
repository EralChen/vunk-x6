import type { Edge, Node } from '@antv/x6'
import type { MaybeRef, Ref } from 'vue'
import { useGraph } from '@vunk-x6/composables'
import { computed, onUnmounted, ref, unref, watchEffect } from 'vue'
import { extractFieldFromNode, getPredecessors } from './utils'

export function usePredecessors (
  nodeMbRef: MaybeRef<Node>,
  options: {
    deep?: boolean
  } = {},
) {
  const graph = useGraph()

  const predecessors = ref([]) as Ref<Node[]>

  // 更新前置节点
  const updatePredecessors = () => {
    const node = unref(nodeMbRef)
    if (!node)
      predecessors.value = []
    else
      predecessors.value = getPredecessors(graph, node.id, options)
  }

  // 检查一个节点是否在当前节点的前置链上
  const isInPredecessorChain = (targetNodeId: string) => {
    const node = unref(nodeMbRef)
    if (!node)
      return false

    // 获取当前的所有前置节点
    const allPredecessors = getPredecessors(graph, node.id, { deep: true })
    return allPredecessors.some(n => n.id === targetNodeId)
  }

  // 监听边的连接和删除事件
  const handleEdgeChange = ({ edge }: { edge: Edge }) => {
    const node = unref(nodeMbRef)
    if (!node)
      return

    // const sourceId = edge.getSourceCellId()
    const targetId = edge.getTargetCellId()

    // 如果当前节点是目标节点，或者连接变化发生在前置链上，则更新前置节点
    if (targetId === node.id || isInPredecessorChain(targetId))
      updatePredecessors()
  }

  // 监听事件
  graph.on('edge:connected', handleEdgeChange)
  graph.on('edge:removed', handleEdgeChange)

  // 初始计算
  watchEffect(updatePredecessors)

  // 清理事件监听
  onUnmounted(() => {
    graph.off('edge:connected', handleEdgeChange)
    graph.off('edge:removed', handleEdgeChange)
  })

  return {
    predecessors,
  }
}

export function useFieldValueRefOpitons (
  nodeMbRef: MaybeRef<Node>,
) {
  const { predecessors } = usePredecessors(nodeMbRef)

  const fieldValueRefOptions = computed(() => {
    return predecessors.value
      .map(extractFieldFromNode)
      .filter(v => !!v.children)
  })

  return {
    predecessors,
    fieldValueRefOptions,
  }
}

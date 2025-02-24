import type { Graph, Node } from '@antv/x6'
import type { __VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import type { Field } from './types'
import { VkRegisterStartNode } from '@vunk-x6/components/register-start-node'
import { eachDeep } from 'deepdash-es/standalone'
import { FieldType } from './const-field-type'

/**
 * 获取节点的前驱节点
 * @param graph
 * @param nodeId
 * @param options - 配置项
 * @param options.deep - 是否深度检索，默认为 true
 * @returns 前驱节点列表
 */
export function getPredecessors (
  graph: Graph,
  nodeId: string,
  options: {
    deep?: boolean
  } = {},
): Node[] {
  const visited = new Set<string>()
  const queue: string[] = []
  const nodes: Node[] = []
  const deep = options?.deep ?? true

  // 获取起始节点的入边
  const inEdges = graph.getIncomingEdges(nodeId)
  if (!inEdges?.length)
    return nodes

  // 处理所有入边
  for (const edge of inEdges) {
    const sourceId = edge.getSourceCellId()
    const sourceNode = graph.getCellById(sourceId) as Node
    if (!sourceNode)
      continue

    nodes.push(sourceNode)

    // 如果需要深度检索，将节点加入队列
    if (deep) {
      queue.push(sourceId)
      visited.add(sourceId)
    }
  }

  // 如果启用深度检索，继续处理队列中的节点
  if (deep) {
    while (queue.length > 0) {
      const currentId = queue.shift()!

      // 获取当前节点的入边
      const currentInEdges = graph.getIncomingEdges(currentId)
      if (!currentInEdges?.length)
        continue

      // 处理所有入边
      for (const edge of currentInEdges) {
        const sourceId = edge.getSourceCellId()
        if (visited.has(sourceId))
          continue

        const sourceNode = graph.getCellById(sourceId) as Node
        if (sourceNode) {
          nodes.push(sourceNode)
          queue.push(sourceId)
          visited.add(sourceId)
        }
      }
    }
  }

  return nodes
}

/**
 * 从一个节点中提取它的可用字段
 */
export function extractFieldFromNode (node: Node) {
  const data = node.getData()
  const field: Field = {
    name: node.id,
    type: FieldType.Object,
    label: data.label ?? '未命名节点',
  }

  // 开始节点的可用字段在 StartNode 中定义
  if (node.shape === VkRegisterStartNode.name) {
    const nodeData: __VkRegisterStartNode.NodeData = data
    field.children = nodeData.input
  }
  else {
    field.children = data.output
  }

  eachDeep(field, (v: Field) => {
    if (!v.label) {
      v.label = v.name
    }
  }, {
    childrenPath: ['children'],
  })

  return field
}

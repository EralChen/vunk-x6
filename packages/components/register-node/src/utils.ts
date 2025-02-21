import type { Graph, Node } from '@antv/x6'

// 使用广度优先搜索获取所有前置节点
export function getAllPredecessors (
  graph: Graph,
  nodeId: string,
): Node[] {
  const visited = new Set<string>()
  const queue: string[] = []
  const nodes: Node[] = []

  // 初始化队列
  queue.push(nodeId)
  visited.add(nodeId)

  while (queue.length > 0) {
    const currentId = queue.shift()!

    // 获取当前节点的入边
    const inEdges = graph.getIncomingEdges(currentId)
    if (!inEdges?.length)
      continue

    // 处理所有入边
    for (const edge of inEdges) {
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

  return nodes
}

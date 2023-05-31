import { ElMessage } from 'element-plus'
import { NodeModel } from '@zzg6/flow/components/editor/src/types'


export function getCurrentNodeId (currentNodeInstIds: string[], currentNodeData: NodeModel) {
  let currentNodeId = currentNodeInstIds[0]
  if (currentNodeInstIds.length > 1) {
    if (!currentNodeData.nodeInstId) {
      ElMessage.warning('选中节点不是当前节点')
      return
    }
    if (!currentNodeData.id) {
      ElMessage.warning('有多个当前节点，请选择一个节点')
      return
    }
    currentNodeId = currentNodeData.nodeInstId
  }
  return currentNodeId
}
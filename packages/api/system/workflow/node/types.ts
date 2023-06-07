import type { ComboConfig, EdgeConfig, NodeConfig } from '@antv/g6'
import type { NodeInstOper } from '@skzz-platform/api/system/workflow/instances/types'
import { NodeModel } from '@zzg6/flow/components/editor/src/types'

export type TotalFlow = {
  nodes: (
    NodeModel & { 
      nodeInstOpers: NodeInstOper[];
      isCurrentNode: 0 | 1
      formColumns: any
      nodeInstId: string
    }
  )[];
  edges?: EdgeConfig[];
  combos?: ComboConfig[];

  [key: string]: any;
} & {
  currentNodeInstIds: string[],
}
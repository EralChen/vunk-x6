import { GraphData } from '@antv/g6'

export interface Workflow {
  name: string,
  id: string, // 流程住建
  flowId: string, // flowId的用途类似于flowCode
  itemId: string, // 关联该流程的业务id, 正常情况下应该是业务端新增的时候才会有，也就是流程启动前关联一个就行,现在这里的做法是在新增的时候写了一个假的关联
  memo: string,
  nodes: any[],
  connections: string
  isStart: 0 | 1,
  // form
  formName?: string
  formVersion?: number
  formId?: string
  formTable?: string 
}

export interface WorkflowNode {
  id: string;
  name: string;
  isJointly: 0 | 1;
  isCurrentNode: 0 | 1;
  label: string;
  opers: { id: string, name: string }[];
  nodeInstId: string;
  assistOpers: { id: string, name: string, nodeId: string }[];
  [k: string]: any
}

export interface WorkflowNodeRaw {
  nextNodes: string;
  currentNodeInstId: string;
  name: string;
  prevNodes: string;
  isCurrentNode: 0 | 1;
  id: string;
}


export type WorkflowData = GraphData 

export interface WorkflowOper {
  operId: string;
  operName: string;
}

export enum WorkFlowNodeState {
  '待审核' = 0,
  '通过' = 10,
  '驳回' = -10,
}
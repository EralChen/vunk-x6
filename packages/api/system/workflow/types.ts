
export interface Workflow {
  name: string,
  id: string,
  flowId: string,
  itemId: string,
  memo: string,
  nodes: any[],
  connections: string
}

export interface WorkflowNode { 
  id: string;
  name: string;
  isJointly: 0|1;

  label: string;
  [k: string]: any
}

export interface WorkflowData {
  edges: {
    id: string;
    source: string;
    target: string;
    [key: string]: any;
  }[]
  nodes: WorkflowNode[]
}

export interface WorkflowOper {
  operId: string;
  operName: string;
}


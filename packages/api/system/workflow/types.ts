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
  prevNodes: string[];
  nextNodes: string[];
  flowId: string;
}


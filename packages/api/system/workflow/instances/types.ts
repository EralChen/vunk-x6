interface InstanceDetail {
  flowInstId: string;
  nodeInstFounder: number;
  nodeInstDeadLine: number;
  nodeInstFounderName: string;
  name?: any;
  nodeInstStartTime: string;
  nodeInstOpers: NodeInstOper[];
  id: string;
  nodeId: string;
  nodeInstEndTime: string;
}
interface NodeInstOper {
  operName: string;
  operId: number;
}
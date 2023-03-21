export interface Workflow {
  name: string,
  id: string,
  flowId: string,
  itemId: string,
  memo: string,
  nodes: any[],
  connections: string
}
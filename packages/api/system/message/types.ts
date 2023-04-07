export type Message = {
  receiver: number;
  receiverName: string;
  founder: number;
  readTime?: any;
  founderName: string;
  confirmTime?: any;
  updateTime: string;
  title: string;
  type: number;
  content: string;
  failMessage?: any;
  sendTime: string;
  updater: number;
  path: string;
  itemId: number;
  foundTime: string;
  param: string;
  updaterName: string;
  client: string;
  id: string;
  tplId: number;
  status: number;
}

export type MessageConfig = {
  modelId: string;
  requireConfirm: number;
  founder?: number;
  requireRead: number;
  founderName?: string;
  updateTime?: string;
  type: number;
  updater?: number;
  path: string;
  foundTime?: string;
  param: string;
  updaterName?: string;
  datasetId: string;
  client: string;
  id?: string;
  tplId: number;
}


export type CommonAddition = {
  founder: string // 创建人id
  founderName: string // 创建人姓名
  foundTime: string // 创建时间
  updater: string // 更新人id
  updaterName: string // 更新人姓名
  updateTime: string // 更新时间
}
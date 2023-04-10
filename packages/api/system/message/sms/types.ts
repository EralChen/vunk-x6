

export type Sms = Required<CSms>
export type CSms = {
  id?: string;
  sender: string;
  appKey: string;
  appSecret: string;
  url: string;
  statusCallBack?: any;
}
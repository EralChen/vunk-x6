

export type Weixin = Required<CWeixin>
export type CWeixin = {
  id?: string;
  appId: string;
  secret: string;
  token: string;
  aesKey: string;
  msgDataFormat: string;
  applicationId: string;
  tenantId: string;
}
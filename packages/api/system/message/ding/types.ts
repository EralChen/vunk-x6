

export type Ding = Required<CDing>
export type CDing = {
  id?: string;
  userAccessKey: string;
  userSecretKey: string;
  domainName: string;
  senderId: string;
  tenantId: string;
}
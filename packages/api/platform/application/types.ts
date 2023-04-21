export interface Application {
  founder: number;
  memo?: any;
  founderName: string;
  updateTime: string;
  requireOrg?: any;
  type: number;
  dir: string;
  updater: number;
  usagePlatform?: any;
  foundTime: string;
  tenantName: string;
  name: string;
  updaterName: string;
  tenantId: string;
  client: string;
  logo?: any;
  id: string;
  applicationId: string;
  databaseId: string;
  isSys?: any;
}


export interface BoundApplication {
  'applicationId': string, // 应用ID
  'tenantId': string // 租户ID
}

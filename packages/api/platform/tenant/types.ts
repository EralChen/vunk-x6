export interface Tenant {
  foundTime: string;
  founder: number;
  tenantId: string;
  name: string;
  updaterName: string;
  founderName: string;
  updateTime: string;
  id: number;
  updater: number;

  /* 租户可能具有绑定的管理员 */
  username?: string;
  password?: string;
}

import { CommonAddition } from '../types'

export type MessageConfig = Required<CMessageConfig> & CommonAddition

export type CMessageConfig = {
  modelId: string;
  requireConfirm: number;
  requireRead: number;
  type: number;
  path: string;
  param: string;
  datasetId: string;
  client: string;
  id?: string;
  tplId: number;
}
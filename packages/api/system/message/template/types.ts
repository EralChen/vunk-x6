import { CommonAddition } from '../types'

export type MessageTemplate = Required<CMessageTemplate> & CommonAddition

export type CMessageTemplate = {
  id?: string;
  title: string;
  tpl: string;
  clientTemplateId: string;
  client: string;
}
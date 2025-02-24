import type { __VkfInputCollection } from '@vunk/form/components/input-collection'
import { fieldColumnMap } from './const-field-column'

export const fieldInfomationItem = {
  templateType: 'VkfInputCollection',
  summaryLabel (data) {
    return `${data.name}`
  },
  columns: [
    fieldColumnMap.name,
    fieldColumnMap.type,
    fieldColumnMap.description,
  ],
} as __VkfInputCollection.Source<any>

export const fieldWithValueInfomationItem = {
  templateType: 'VkfInputCollection',
  summaryLabel (data) {
    return `${data.name}`
  },
  columns: [
    fieldColumnMap.name,
    fieldColumnMap.type,
    fieldColumnMap.description,
  ],
} as __VkfInputCollection.Source<any>

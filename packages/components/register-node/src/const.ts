import type { __VkfInputCollection } from '@vunk/form/components/input-collection'
import type { Field } from './types'
import { fieldColumnMap } from './const-field-column'

export const fieldInformationItem = {
  templateType: 'VkfInputCollection',
  information: true,
  informationProps: {
    typeRender: (item: Field) => item.name
      ? 'primary'
      : 'warning',
    labelRender: (item: Field) => item.name
      ? item.name
      : '未定义',
  },
  columns: [
    fieldColumnMap.name,
    fieldColumnMap.type,
    fieldColumnMap.description,
    fieldColumnMap.defaultValue,

  ],
} as __VkfInputCollection.Source<any>

export const fieldWithValueInformationItem = {
  templateType: 'VkfInputCollection',
  information: true,
  informationProps: {
    typeRender: (item: Field) => item.name
      ? 'primary'
      : 'warning',
    labelRender: (item: Field) => item.name
      ? item.name
      : '未定义',
  },
  columns: [
    fieldColumnMap.name,
    fieldColumnMap.type,
    fieldColumnMap.description,
  ],
} as __VkfInputCollection.Source<any>

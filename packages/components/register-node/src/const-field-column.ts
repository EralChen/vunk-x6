import type { __VkfInputCollection } from '@vunk/form/components/input-collection'
import type { Field } from './types'
import { fieldTypeOptions } from './const'

type Column<F> = __VkfInputCollection.Column<Field<F>>

const nameColumn: Column<'name'> = {
  templateType: 'VkfInput',
  label: '字段',
  prop: 'name',
}

const typeColumn = {
  templateType: 'VkfSelect',
  label: '类型',
  prop: 'type',
  templateProps: {
    options: fieldTypeOptions,
  },
} as const

const defaultValueColumn: Column<'defaultValue'> = {
  expandVisible: true,
  hidden: true,
  prop: 'defaultValue',
  templateType: 'VkfInput',
  label: '默认值',
  templateProps: {
    placeholder: '默认参数值, 在没有传入时使用',
  },
}

const descriptionColumn: Column<'description'> = {
  expandVisible: true,
  hidden: true,
  prop: 'description',
  templateType: 'VkfInput',
  label: '描述',
  templateProps: {
    type: 'textarea',
    placeholder: '帮助程序准确理解该字段的含义',
    rows: 2,
  },
}

export const fieldColumnMap = {
  name: nameColumn,
  type: typeColumn,
  defaultValue: defaultValueColumn,
  description: descriptionColumn,
}

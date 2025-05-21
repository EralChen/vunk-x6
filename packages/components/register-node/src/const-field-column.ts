import type { __VkNodeDrawer } from '@vunk-x16/components/node-drawer'
import type { FieldWithValue } from '@vunk-x16/shared'
import type { __VkfCascader } from '@vunk/form'
import type { __VkfInputCollection } from '@vunk/form/components/input-collection'
import { fieldTypeOptions } from './const-field-type'

type Column<F> = __VkNodeDrawer.InputCollectionColumn<FieldWithValue<F>>

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

const valueColumn: Column<'value'> = {
  templateType: 'VkfInput',
  label: '值',
  prop: 'value',
}

const childrenColumn: Column<'children'> = {
  prop: 'children',
  label: '子项',
  templateType: 'VkfInputCollection',
  expandVisible: true,
  hidden: true,
  templateProps: {
    labelPosition: 'top',
  },
}

export const fieldColumnMap = {
  name: nameColumn,
  type: typeColumn,
  defaultValue: defaultValueColumn,
  description: descriptionColumn,
  value: valueColumn,
  children: childrenColumn,
}

import type { __VkfInputCollection } from '@vunk/form/components/input-collection'

export enum FieldType {
  String = 'String',
  Integer = 'Integer',
  Boolean = 'Boolean',
  Number = 'Number',
  Object = 'Object',
  ArrayString = 'ArrayString',
  ArrayInteger = 'ArrayInteger',
  ArrayBoolean = 'ArrayBoolean',
  ArrayNumber = 'ArrayNumber',
  ArrayObject = 'ArrayObject',
}
export const fieldTypeOptions = [
  {
    label: 'String',
    value: FieldType.String,
  },
  {
    label: 'Integer',
    value: FieldType.Integer,
  },
  {
    label: 'Boolean',
    value: FieldType.Boolean,
  },
  {
    label: 'Number',
    value: FieldType.Number,
  },
  {
    label: 'Object',
    value: FieldType.Object,
  },
  {
    label: 'Array<String>',
    value: FieldType.ArrayString,
  },
  {
    label: 'Array<Integer>',
    value: FieldType.ArrayInteger,
  },
  {
    label: 'Array<Boolean>',
    value: FieldType.ArrayBoolean,
  },
  {
    label: 'Array<Number>',
    value: FieldType.ArrayNumber,
  },
  {
    label: 'Array<Object>',
    value: FieldType.ArrayObject,
  },
]
export const fieldTypeMap = fieldTypeOptions.reduce((acc, cur) => {
  acc[cur.value] = cur
  return acc
}, {} as Record<FieldType, typeof fieldTypeOptions[number]>)

export const fieldInfomationItem = {
  templateType: 'VkfInputCollection',
  summaryLabel (data) {
    return `${data.name}`
  },
  columns: [
    {
      label: '字段',
      prop: 'name',
      templateType: 'VkfInput',
    },
    {
      prop: 'type',
      templateType: 'VkfSelect',
      label: '类型',
      templateProps: {
        options: fieldTypeOptions,
      },
    },
    {
      prop: 'description',
      templateType: 'VkfInput',
      label: '描述',
    },
  ],
} as __VkfInputCollection.Source

export const fieldWithValueInfomationItem = {
  templateType: 'VkfInputCollection',
  summaryLabel (data) {
    return `${data.name}`
  },
  columns: [
    {
      label: '字段',
      prop: 'name',
      templateType: 'VkfInput',
    },
    {
      prop: 'type',
      templateType: 'VkfSelect',
      label: '类型',
      templateProps: {
        options: fieldTypeOptions,
      },
    },
  ],
}

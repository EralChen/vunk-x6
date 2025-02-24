import type { __VkfCascader } from '@vunk/form'
import type { __VkfInputCollection } from '@vunk/form/components/input-collection'
import type { __VkNodeDrawer } from '@vunk-x6/components/node-drawer'
import type { Field, FieldWithValue } from '@vunk-x6/shared'
import { nextTick } from 'vue'
import { fieldTypeOptions } from './const-field-type'

type Column<F> = __VkfInputCollection.Column<FieldWithValue<F>>

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

const changeEffect: __VkNodeDrawer.CascaderChangeEffect = (
  _value,
  nodes,
  prop,
  emitSetData,
) => {
  const node = nodes[nodes.length - 1]
  if (!node)
    return
  const data = node.data as unknown as Field

  const propArray = [prop].flat(2)
  propArray.pop()
  propArray.push('type')

  nextTick(() => {
    // 修改引用时, 将引用的类型设置到字段的类型上
    emitSetData({
      k: propArray,
      v: data.type,
    })
  })
}

const valueRefColumn: Column<'valueRef'> = {
  templateType: 'VkfCascader',
  label: '值引用',
  prop: 'valueRef',
  templateProps: {
    changeEffect,
  } as unknown as __VkfCascader.Source<'valueRef'>,
}

export const fieldColumnMap = {
  name: nameColumn,
  type: typeColumn,
  defaultValue: defaultValueColumn,
  description: descriptionColumn,
  valueRef: valueRefColumn,
}

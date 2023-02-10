import { bindPropsFactory } from '@vunk/core/shared/utils-vue'
import { pickObject } from '@vunk/core/shared/utils-object'
import { tableV2Props } from 'element-plus'
const tableV2PropsV2 = {
  ...tableV2Props,
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
}
export const props = {
  ...pickObject(tableV2PropsV2, {
    excludes: ['style', 'class'],
  }),
  tableClass: {
    type: [String, Object, Array],
    default: 'sk-app-tables-table',
  },
  tableStyle: {
    type: [String, Object, Array],
    default: undefined,
  },
}

export const createTableV2BindProps = bindPropsFactory(props)

export const emits = {
}
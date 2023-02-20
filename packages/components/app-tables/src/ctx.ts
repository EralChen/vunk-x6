import { bindPropsFactory, onEmitsFactory } from '@vunk/core/shared/utils-vue'
import { pickObject } from '@vunk/core/shared/utils-object'
import { 
  tableV2Props as _tableV2Props, 
  paginationProps as _paginationProps,
  paginationEmits as _paginationEmits,
} from 'element-plus'

const tableV2Props = pickObject({
  ..._tableV2Props,
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
}, {
  excludes: ['style', 'class'],
})

const paginationProps = pickObject(
  _paginationProps,
  {
    excludes: ['currentPage'],
  },
)

const paginationEmits = pickObject(
  _paginationEmits,
  {
    excludes: ['update:current-page'],
  },
)

export const props = {
  ...tableV2Props,
  ...paginationProps,
  tableClass: {
    type: [String, Object, Array],
    default: 'sk-app-tables-table',
  },
  tableStyle: {
    type: [String, Object, Array],
    default: undefined,
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
  },

  start: {
    type: Number,
    default: 0,
  },
  
  pageSize: {
    type: Number,
    default: 10,
  },

  modelValue: null,
  oidField: {
    type: String,
    default: 'id',
  },
}

export const createTableV2BindProps = bindPropsFactory(tableV2Props)
export const createPaginationBindProps = bindPropsFactory(paginationProps)

export const emits = {
  ...paginationEmits,
  'update:start': (val: number) => typeof val === 'number',
  'update:modelValue': null,
}

export const createPaginationOnEmits = onEmitsFactory(paginationEmits)

import { bindPropsFactory, onEmitsFactory } from '@vunk/core/shared/utils-vue'
import { pickObject } from '@vunk/core/shared/utils-object'
import { 
  
  paginationProps as _paginationProps,
  paginationEmits as _paginationEmits,
} from 'element-plus'
import { PropType } from 'vue'
import { Column } from './types'
import { _VkTableColumnsElCtx } from '@vunk/skzz/components/table-columns'
import { tableProps as _tableProps, tableEmits } from './el-ctx'
const paginationProps = pickObject(
  _paginationProps,
  {
    excludes: ['currentPage'],
  },
)
export const createPaginationBindProps = bindPropsFactory(paginationProps)

const paginationEmits = pickObject(
  _paginationEmits,
  {
    excludes: ['update:current-page'],
  },
)
export const createPaginationOnEmits = onEmitsFactory(paginationEmits)


const tableProps = pickObject(_tableProps, {
  excludes: ['style', 'className'],
})
export const createTableBindProps = bindPropsFactory(tableProps)

export const props = {
  ..._VkTableColumnsElCtx.tableColumnProps,
  ...paginationProps,
  ...tableProps,
  border: {
    type: Boolean,
    default: true,
  },
  tableClass: {
    type: String,
    default: 'sk-app-tables-v1-table',
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

  columns: {
    type: Array as PropType<Column<any>[]>,
    default: () => [],
  },

  modules: {
    type: Array as PropType<('pagination')[]>,
    default: () => ['pagination'],
  },
  /*   
  :align="'center'"
  :headerAlign="'center'"
  */
  align: {
    type: String,
    default: 'center',
  },
  headerAlign: {
    type: String,
    default: 'center',
  },
  

}


export const emits = {
  ...paginationEmits,
  ...tableEmits,
  'update:start': (val: number) => typeof val === 'number',
}

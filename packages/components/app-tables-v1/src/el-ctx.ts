
import type {
  CSSProperties,
  ComponentInternalInstance,
  PropType,
  Ref,
  VNode,
} from 'vue'

import { buildProp, Nullable } from '@element-plus/utils'
import { TableColumnCtx } from 'element-plus'
import TableLayout from 'element-plus/es/components/table/src/table-layout'
import { TableOverflowTooltipOptions } from 'element-plus/es/components/table/src/util'
import { bindPropsFactory, onEmitsFactory } from '@vunk/core/shared/utils-vue'
// import type { Store } from '../store'
// import type { TableColumnCtx } from '../table-column/defaults'
// import type TableLayout from '../table-layout'
// import type { TableOverflowTooltipOptions } from '../util'

export const componentSizes = ['', 'default', 'small', 'large'] as const

export type ComponentSize = typeof componentSizes[number]

export const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false,
} as const)

export type DefaultRow = any

interface TableRefs {
  tableWrapper: HTMLElement
  headerWrapper: HTMLElement
  footerWrapper: HTMLElement
  fixedBodyWrapper: HTMLElement
  rightFixedBodyWrapper: HTMLElement
  bodyWrapper: HTMLElement
  [key: string]: any
}

interface TableState {
  isGroup: Ref<boolean>
  resizeState: Ref<{
    width: any
    height: any
  }>
  doLayout: () => void
  debouncedUpdateLayout: () => void
}

type HoverState<T> = Nullable<{
  cell: HTMLElement
  column: TableColumnCtx<T>
  row: T
}>

type RIS<T> = { row: T; $index: number; store: any; expanded: boolean }

type RenderExpanded<T> = ({
  row,
  $index,
  store,
  expanded,
}: RIS<T>) => VNode

type SummaryMethod<T> = (data: {
  columns: TableColumnCtx<T>[]
  data: T[]
}) => string[]

interface Table<T> extends ComponentInternalInstance {
  $ready: boolean
  hoverState?: HoverState<T>
  renderExpanded: RenderExpanded<T>
  store: any
  layout: TableLayout<T>
  refs: TableRefs
  tableId: string
  state: TableState
}

type ColumnCls<T> = string | ((data: { row: T; rowIndex: number }) => string)
type ColumnStyle<T> =
  | CSSProperties
  | ((data: { row: T; rowIndex: number }) => CSSProperties)
type CellCls<T> =
  | string
  | ((data: {
      row: T
      rowIndex: number
      column: TableColumnCtx<T>
      columnIndex: number
    }) => string)
type CellStyle<T> =
  | CSSProperties
  | ((data: {
      row: T
      rowIndex: number
      column: TableColumnCtx<T>
      columnIndex: number
    }) => CSSProperties)
type Layout = 'fixed' | 'auto'
interface TableProps<T> {
  data: T[]
  size?: ComponentSize
  width?: string | number
  height?: string | number
  maxHeight?: string | number
  fit?: boolean
  stripe?: boolean
  border?: boolean
  rowKey?: string | ((row: T) => string)
  context?: Table<T>
  showHeader?: boolean
  showSummary?: boolean
  sumText?: string
  summaryMethod?: SummaryMethod<T>
  rowClassName?: ColumnCls<T>
  rowStyle?: ColumnStyle<T>
  cellClassName?: CellCls<T>
  cellStyle?: CellStyle<T>
  headerRowClassName?: ColumnCls<T>
  headerRowStyle?: ColumnStyle<T>
  headerCellClassName?: CellCls<T>
  headerCellStyle?: CellStyle<T>
  highlightCurrentRow?: boolean
  currentRowKey?: string | number
  emptyText?: string
  expandRowKeys?: any[]
  defaultExpandAll?: boolean
  defaultSort?: Sort
  tooltipEffect?: string
  tooltipOptions?: TableOverflowTooltipOptions
  spanMethod?: (data: {
    row: T
    rowIndex: number
    column: TableColumnCtx<T>
    columnIndex: number
  }) =>
    | number[]
    | {
        rowspan: number
        colspan: number
      }
    | undefined
  selectOnIndeterminate?: boolean
  indent?: number
  treeProps?: {
    hasChildren?: string
    children?: string
  }
  lazy?: boolean
  load?: (row: T, treeNode: TreeNode, resolve: (data: T[]) => void) => void
  className?: string
  style?: CSSProperties
  tableLayout?: Layout
  scrollbarAlwaysOn?: boolean
  flexible?: boolean
}

export interface Sort {
  prop: string
  order: 'ascending' | 'descending'
  init?: any
  silent?: any
}



export interface TreeNode {
  expanded?: boolean
  loading?: boolean
  noLazyChildren?: boolean
  indent?: number
  level?: number
  display?: boolean
}


export const tableProps = {
  data: {
    type: Array as PropType<DefaultRow[]>,
    default: () => [],
  },
  size: useSizeProp,
  width: [String, Number],
  height: [String, Number],
  maxHeight: [String, Number],
  fit: {
    type: Boolean,
    default: true,
  },
  stripe: Boolean,
  border: Boolean,
  rowKey: [String, Function] as PropType<TableProps<DefaultRow>['rowKey']>,
  showHeader: {
    type: Boolean,
    default: true,
  },
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function as PropType<TableProps<DefaultRow>['summaryMethod']>,
  rowClassName: [String, Function] as PropType<
    TableProps<DefaultRow>['rowClassName']
  >,
  rowStyle: [Object, Function] as PropType<TableProps<DefaultRow>['rowStyle']>,
  cellClassName: [String, Function] as PropType<
    TableProps<DefaultRow>['cellClassName']
  >,
  cellStyle: [Object, Function] as PropType<
    TableProps<DefaultRow>['cellStyle']
  >,
  headerRowClassName: [String, Function] as PropType<
    TableProps<DefaultRow>['headerRowClassName']
  >,
  headerRowStyle: [Object, Function] as PropType<
    TableProps<DefaultRow>['headerRowStyle']
  >,
  headerCellClassName: [String, Function] as PropType<
    TableProps<DefaultRow>['headerCellClassName']
  >,
  headerCellStyle: [Object, Function] as PropType<
    TableProps<DefaultRow>['headerCellStyle']
  >,
  highlightCurrentRow: Boolean,
  currentRowKey: [String, Number],
  emptyText: String,
  expandRowKeys: Array as PropType<TableProps<DefaultRow>['expandRowKeys']>,
  defaultExpandAll: Boolean,
  defaultSort: Object as PropType<TableProps<DefaultRow>['defaultSort']>,
  tooltipEffect: String,
  tooltipOptions: Object as PropType<TableProps<DefaultRow>['tooltipOptions']>,
  spanMethod: Function as PropType<TableProps<DefaultRow>['spanMethod']>,
  selectOnIndeterminate: {
    type: Boolean,
    default: true,
  },
  indent: {
    type: Number,
    default: 16,
  },
  treeProps: {
    type: Object as PropType<TableProps<DefaultRow>['treeProps']>,
    default: () => {
      return {
        hasChildren: 'hasChildren',
        children: 'children',
      }
    },
  },
  lazy: Boolean,
  load: Function as PropType<TableProps<DefaultRow>['load']>,
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  className: {
    type: String,
    default: '',
  },
  tableLayout: {
    type: String as PropType<Layout>,
    default: 'fixed',
  },
  scrollbarAlwaysOn: {
    type: Boolean,
    default: false,
  },
  flexible: Boolean,
}

export const createElTableBindProps = bindPropsFactory(tableProps)


export const tableEmits = {
  'select': null,
  'select-all': null,
  'selection-change': null,
  'cell-mouse-enter': null,
  'cell-mouse-leave': null,
  'cell-contextmenu': null,
  'cell-click': null,
  'cell-dblclick': null,
  'row-click': null,
  'row-contextmenu': null,
  'row-dblclick': null,
  'header-click': null,
  'header-contextmenu': null,
  'sort-change': null,
  'filter-change': null,
  'current-change': null,
  'header-dragend': null,
  'expand-change': null,

}

export const createElTableOnEmits = onEmitsFactory(tableEmits)

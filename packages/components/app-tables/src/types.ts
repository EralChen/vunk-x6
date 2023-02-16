import type { Column as _Column } from 'element-plus'

export interface SelectionColumn extends _Column {
  type: 'selection'

}

export interface IndexColumn extends _Column {
  type: 'index'
}

export type Column = _Column | SelectionColumn | IndexColumn

import type { Column as _Column } from 'element-plus'

export interface Column extends _Column {
  type?: 'selection' | 'button' | 'index'

}


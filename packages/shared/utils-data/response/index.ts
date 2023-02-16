import { RDatasCol } from '@vunk/skzz'
import { __SkAppTables } from '@skzz-platform/components/app-tables'
export const genColumns = (cols: RDatasCol[]) => {
  return cols.map(item => {
    return {
      dataKey: item.prop,
      width: item.width,
      align: item.align,
      title: item.label,
      fixed: item.fixed,
      
      type: item.type,
      
    } as __SkAppTables.Column
  })
}
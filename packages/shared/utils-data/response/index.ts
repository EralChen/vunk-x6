import { RDataCol } from '@vunk/skzz'
import { __SkAppTables } from '@skzz-platform/components/app-tables'
export const genColumn = (item: RDataCol) => {
  return {
    key: item.prop,
    dataKey: item.prop,
    width: item.width || 150,
    align: item.align,
    title: item.label,
    fixed: item.fixed,
    flexGrow: item.flexGrow || '1',
  
    type: item.type,
      
  } as __SkAppTables.Column

}
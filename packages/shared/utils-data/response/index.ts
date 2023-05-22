import { RDataCol } from '@vunk/skzz'
import { __SkAppTables } from '@skzz-platform/components/app-tables'
import { __SkAppTablesV1 } from '@skzz-platform/components/app-tables-v1'
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

export const genColumns = (
  columns:RDataCol[],
  propToCol: Record<string, Partial<__SkAppTables.Column> | null>,
  typeToCol: Record<string, __SkAppTables.Column>,
) => columns.reduce((a, c) => {
  const propCol = propToCol[c.prop]
  if (propCol === null) {
    return a
  }

  if (typeToCol[c.type]) {
    a.push(typeToCol[c.type])
  } else if (propCol) {
    a.push({
      ...genColumn(c),
      ...propCol,
    })
  } else {
    a.push(genColumn(c))
  }

  return a
}, [] as __SkAppTables.Column[])


export const genColumnsV1 = <T = any>(
  columns:RDataCol[],
  propToCol: Record<string, Partial<T> | null>,
  typeToCol: Record<string, T>,
) => columns.reduce((a, c) => {
    const propCol = propToCol[c.prop]
    if (propCol === null) {
      return a
    }

    if (typeToCol[c.type]) {
      a.push(typeToCol[c.type])
    } else if (propCol) {
      a.push({
        ...c,
        ...propCol,
      } as unknown as T)
    } else {
      a.push(c as unknown as T)
    }

    return a
  }, [] as T[])


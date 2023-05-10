import { Menu } from '@skzz-platform/api/system/menu'
import { ReturnVoid } from '@vunk/core'

export type TreeCheckEvents = [
 Menu, 
  {
    checkedNodes: Menu[],
    checkedKeys: string[],
    halfCheckedNodes: Menu[],
    halfCheckedKeys: string[],
  },
]

export type CheckEvents = [...TreeCheckEvents, Record<string, Menu>]

export type OnCheck = (...args: CheckEvents) => ReturnVoid
export type Row = Menu

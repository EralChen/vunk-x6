import { registerNode } from '@antv/g6'
import { registerSecondParams } from './common'
import { MaterialNode } from './ctx'

export function genCircle () {
  registerNode(
    MaterialNode.zzCircle,
    registerSecondParams,
    'circle',
  )
}
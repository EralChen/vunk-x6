import { registerNode } from '@antv/g6'
import { registerSecondParams } from './common'
import { MaterialNode } from './ctx'

export function genDiamond () {
  registerNode(
    MaterialNode.zzDiamond,
    registerSecondParams,
    'diamond',
  )
}
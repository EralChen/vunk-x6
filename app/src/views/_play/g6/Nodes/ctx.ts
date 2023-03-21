import { ModelStyle } from '@antv/g6'

export enum MaterialNode {
  'zzRect' = 'zzRect',
  'zzCircle' = 'zzCircle',
  'zzDiamond' = 'zzDiamond'
}
export const nodeStyleMap: Record<MaterialNode, ModelStyle> = {
  [MaterialNode.zzRect]: {
    style: {
    },
    description: '',
    label: '节点',
    class: '', 
    anchorPoints: [
      [0.5, 0],
      [1, 0.5],
      [0.5, 1],
      [0, 0.5],
    ],
  },
  [MaterialNode.zzCircle]: {
    label: '起始',
    class: '', 
    anchorPoints: [
      [0, 0.5],
      [1, 0.5],
    ],
    size: 40,
  },
  [MaterialNode.zzDiamond]: {
    label: '判断',
    class: '', 
    anchorPoints: [
      [0, 0.5],
      [1, 0.5],
    ],
    size: 80,
  },
}
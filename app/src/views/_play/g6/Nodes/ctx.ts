import { ModelStyle } from '@antv/g6'

export enum MaterialNode {
  'zzRect' = 'zzRect',
  'circle' = 'circle',
  'diamond' = 'diamond'
}
export const nodeStyleMap: Record<MaterialNode, ModelStyle> = {
  zzRect: {
    style: {
      color: '#2196f4',
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
    linkPoints: {
      left: true,
      right: true,
      top: true,
      bottom: true,
    },
  },
  circle: {
    label: '起始',
    class: '', 
    anchorPoints: [
      [0.5, 0],
      [1, 0.5],
      [0.5, 1],
      [0, 0.5],
    ],
    size: 40,
    linkPoints: {
      left: true,
      right: true,
    },
  },
  diamond: {
    label: '判断',
    class: '', 
    anchorPoints: [
      [0.5, 0],
      [1, 0.5],
    ],
    size: 80,
  },
}
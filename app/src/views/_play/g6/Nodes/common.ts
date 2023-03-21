import { IGroup, Item, registerNode } from '@antv/g6'

export function addAnchorPoints (anchorPoints: number[][], group: IGroup | undefined ) {
  const bbox = group?.getBBox()
  anchorPoints.forEach((anchorPos: any, i: number) => {
    group?.addShape('circle', {
      attrs: {
        r: 5,
        x: bbox.x + bbox.width * anchorPos[0],
        y: bbox.y + bbox.height * anchorPos[1],
        fill: '#fff',
        stroke: '#5F95FF',
      },
      name: `anchor-point`,
      anchorPointIdx: i,
      links: 0,
      visible: true,
      draggable: true,
    })
  })
}

export function resetNativeState (name?: string, value?: string | boolean, item?: Item ) {
  if (!item) return
  const group = item.getContainer()
  const shape = group.get('children')[0]
  if (name === 'selected') {
    if (value) {
      shape.attr('stroke', '#1890ff')
      shape.attr('lineWidth', 2)
    } else {
      shape.attr('stroke', '#2196f4')
      shape.attr('lineWidth', 1)
    }
  }
}


export const registerSecondParams: Parameters<typeof registerNode>[1] = {
  afterDraw (cfg, group) {
    const anchorPoints = (this as any).getAnchorPoints(cfg)
    addAnchorPoints(anchorPoints, group)
  },
  getAnchorPoints (cfg) {
    return cfg?.anchorPoints || [[0, 0.5],[1, 0.5],[0.5, 0],[0.5, 1]]
  },
  setState (name, value, item) {
    // chart-gpt也太牛逼了吧
    resetNativeState(name, value, item)
  },
}
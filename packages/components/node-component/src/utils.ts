import type { Node } from '@antv/x6'

function addCustomPort (x: number, y: number, node: Node) {
  const bbox = node.getBBox()
  const { width, height } = node.size()
  const angle = node.angle() // 获取节点的旋转角度

  // 计算点击位置相对于节点左上角的偏移
  let nodePosition = {
    x: x - bbox.x,
    y: y - bbox.y,
  }

  // 将角度转换为弧度
  const radians = angle * (Math.PI / 180)

  // 计算旋转中心，节点的中心
  const centerX = bbox.x + width / 2
  const centerY = bbox.y + height / 2

  // 平移点击位置，使其相对于旋转中心
  const translatedX = nodePosition.x - (centerX - bbox.x)
  const translatedY = nodePosition.y - (centerY - bbox.y)

  // 进行逆旋转变换
  const rotatedX
  = translatedX * Math.cos(-radians) - translatedY * Math.sin(-radians)
  const rotatedY
  = translatedX * Math.sin(-radians) + translatedY * Math.cos(-radians)

  // 平移回相对于节点左上角的位置
  nodePosition = {
    x: rotatedX + (centerX - bbox.x),
    y: rotatedY + (centerY - bbox.y),
  }

  console.log('nodePosition')
  console.log(nodePosition)

  node.addPort({
    group: 'custom',
    attrs: {
      text: { text: '' },
    },
    args: {
      x: `${(nodePosition.x / width) * 100}%`,
      y: `${(nodePosition.y / height) * 100}%`,
    },
  })
}

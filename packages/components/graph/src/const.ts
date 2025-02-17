import type { Graph } from '@antv/x6'
import { Options } from '@antv/x6'
import { MagnetRule } from '@vunk-x6/components/port'

export const defaultConnecting = {
  snap: true, // 启用连线的自动吸附
  allowBlank: false, // 禁止连线到空白位置
  allowLoop: false, // 禁止自环
  highlight: true, // 拖动边时突出显示可用的连接点

  allowNode: false, // 禁止连线到节点
  allowEdge: false, // 禁止连线到边

  // 在起始和终止节点的相同链接桩之间只允许创建一条边
  allowMulti: 'withPort',

  // 美化连线
  connector: 'rounded',
  router: {
    name: 'er',
    args: {
      direction: 'H',
    },
  },

  validateConnection (
    e: Options.ValidateConnectionArgs,
  ) {
    const { targetMagnet } = e
    const magnetRule = targetMagnet?.getAttribute('magnet-rule') as MagnetRule

    // 当前节点只允许主动输出, 说明当前节点不能是终点
    if (magnetRule && magnetRule === MagnetRule.active) {
      return false
    }

    const defaultValidateConnection = Options.defaults.connecting!.validateConnection.bind(this)
    return defaultValidateConnection(e)
  },

  validateMagnet (e) {
    const magnetRule = e.magnet.getAttribute('magnet-rule') as MagnetRule

    // 当前节点只允许被动输入, 说明当前节点不能是起点
    if (magnetRule && magnetRule === MagnetRule.passive) {
      return false
    }

    return true
  },

} as Options.Connecting

export const defaultHighlighting: Partial<Options.Highlighting> = {
  magnetAvailable: {
    name: 'stroke',
    args: {
      padding: 4,
      attrs: {
        'stroke-width': 2,
        'stroke': '#67C23A',
      },
    },
  },
}

export const defaultAttrs = {
  circle: {
    r: 8,
    stroke: '#2B65FF',
    fill: '#fff',
    magnet: true,
  },
}

export enum MagnetRule {
  /**
   * 当前节点只允许主动输出
   */
  active = 'active',

  /**
   * 当前节点只允许被动输入
   */
  passive = 'passive',

}

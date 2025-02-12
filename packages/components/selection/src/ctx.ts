import type { Cell, ModifierKey } from '@antv/x6'
import type { Selection } from '@antv/x6-plugin-selection'
import type { PropType } from 'vue'
import type { LoadEvent } from './types'

export const props = {

  defaultOptions: {
    type: Object as PropType<Selection.Options>,
    default: () => ({}),
  },

  /**
   * 图中已选中的单元格数组
   * @default []
   */
  modelValue: {
    type: Array as PropType<Cell[]>,
    default: () => [],
  },
  /**
   * 是否允许同时选择多个单元格
   * @default false
   */
  mutiple: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许通过拖拽移动选中的单元格
   * @default true
   */
  movable: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否启用框选功能。启用后，用户可以通过拖拽来选择多个单元格
   * @default false
   */
  rubberband: {
    type: Boolean,
    default: false,
  },
  /**
   * 设置严格框选模式：
   * - true时，只选择完全在框选区域内的单元格
   * - false时，也会选择与框选区域相交的单元格
   * @default false
   */
  strict: {
    type: Boolean,
    default: false,
  },
  /**
   * 过滤器函数，用于控制哪些单元格可以被选中
   * 返回true表示允许选中，false表示禁止选中
   * @type {Selection.Filter | null}
   */
  filter: {
    type: [Function, null] as PropType<Selection.Filter>,
    default: undefined,
  },
  /**
   * 激活框选功能所需的键盘修饰键
   * 可以是单个键字符串或修饰键数组
   * @type {string | ModifierKey[]}
   */
  modifiers: {
    type: [String, Array] as PropType<string | ModifierKey[]>,
    default: undefined,
  },
  /**
   * 选中单元格时显示的自定义内容
   * @type {Selection.Content}
   */
  displayContent: null,
}

export const emits = {
  /**
   * 当选中状态变化时触发，用于更新v-model值
   * @param {Cell[]} value - 当前选中的单元格数组
   */
  'update:modelValue': (value: Cell[]) => Array.isArray(value),
  /**
   * 当选择插件加载并初始化完成时触发
   * @param {LoadEvent} e - 包含初始化详情的加载事件
   */
  'load': (e: LoadEvent) => e,
}

import type { PropType } from 'vue'

export const props = {
  /**
   * @description v-model 是否展示 drawer
   */
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  /**
   * @description drawer 对应的节点类型
   */
  shape: {
    type: String,
    required: true,
  },

  size: {
    type: [String, Number] as PropType<string | number>,
    default: 550,
  },

  withHeader: {
    type: Boolean,
    default: true,
  },

  description: {
    type: String,
    default: '',
  },

}

export const emits = {
  'update:modelValue': (_value: boolean) => true,
}

import { NOOP } from '@vunk/core/shared/utils-function'
import { Button } from '@skzz-platform/api/system/button'
import { PropType } from 'vue'
import { VueComponentPropsType } from '@vunk/core/shared/types'
import { ElButton } from 'element-plus'
type ElButtonProps = VueComponentPropsType<typeof ElButton>
export const props = {
  modules: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  api: {
    type: Function  as PropType<() => Promise<Button[]>>,
    default: NOOP,
  },

  excludes: {
    type: Array as PropType<('search'|'increase'|'remove'|'modify')[]>,
    default: () => ['search', 'increase'],
  },

  buttonPropsRecord: {
    type: Object as PropType<Record<string, ElButtonProps>>,
    default: () => ({}),
  },
}

export const emits = {
  c: null,
  r: null,
  u: null,
  d: null,
  increase: null,
  modify: null,
  remove: null,
  search: null,
  click: (e: string) => e, 
}

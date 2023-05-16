import { Role } from '@skzz-platform/api/system/role'
import { PropType } from 'vue'

export const props = {
  filter: {
    type: Function as PropType<(e: Role) => any>,
    default: () => true,
  },
}

export const emits = {
}
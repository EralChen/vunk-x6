import { createSharedComposable, useDark } from '@vueuse/core'

export const useSharedDark = createSharedComposable(useDark)
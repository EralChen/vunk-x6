import { createCustomEventComposable } from '@skzz-platform/shared/utils-event'

export * from './use-menu-click'
export * from './use-init-theme'


export const useUpdateApplictionEvent = createCustomEventComposable('custom:updateAppliction')

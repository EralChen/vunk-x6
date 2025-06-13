import type { __VkfInformation, BasicSource } from '@vunk/form'

export interface PortSource<P> extends BasicSource {
  templateType: 'VkPort'
  prop: P
  label: string
}

export type FormItem<P extends string = string> = __VkfInformation.FormItem<P> | PortSource<P>

export {}

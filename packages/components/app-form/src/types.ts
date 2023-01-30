import { ElColSource, ElRowSource, FormItemRendererSource, VkfFlexSource } from '@vunk/form'

export type FormItem<P extends string = string> = FormItemRendererSource<P>
  | ElRowSource<FormItem<P>> 
  | ElColSource<FormItem<P>> 
  | VkfFlexSource<FormItem<P>>

export {}

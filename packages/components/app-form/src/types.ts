import { ComponentSource, ElColSource, ElRowSource, FormItemRendererSource, VkfButtonSource, VkfFlexSource } from '@vunk/form'

export type FormItem<P extends string = string> = FormItemRendererSource<P>
  | ElRowSource<FormItem<P>> 
  | ElColSource<FormItem<P>> 
  | VkfFlexSource<FormItem<P>>

export type CoreFormItem<P  extends string = string> = 
  Exclude<FormItemRendererSource<P>, 
    ComponentSource | VkfButtonSource<P>
  >

export {}

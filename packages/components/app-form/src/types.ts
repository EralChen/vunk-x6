import { VueComponentPropsType } from '@vunk/core'
import { ComponentSource, ElColSource, ElRowSource, FormItemRendererSource, VkfButtonSource, VkfFlexSource, BasicSource } from '@vunk/form'
import type { SkCssColorPicker } from '@skzz-platform/components/css-color-picker'

interface SkCssColorPickerSource<P extends string = string>
extends VueComponentPropsType<typeof SkCssColorPicker>, BasicSource { 
  templateType: 'SkCssColorPicker',
  prop: P,
}

export type FormItem<P extends string = string> = FormItemRendererSource<P>
  | SkCssColorPickerSource<P>
  | ElRowSource<FormItem<P>> 
  | ElColSource<FormItem<P>> 
  | VkfFlexSource<FormItem<P>>


export type CoreFormItem<P  extends string = string> = 
  Exclude<FormItemRendererSource<P>, 
    ComponentSource | VkfButtonSource<P>
  >




export {}

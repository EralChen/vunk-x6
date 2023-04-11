import { rWeixinList } from '@skzz-platform/api/system/message'
import { ApiReturnType } from '@vunk/core'
import { FormItemRendererSource, ElColSource, ElRowSource, VkfFlexSource, ComponentSource } from '@vunk/form'
import { __VkRendererTemplateGis } from '@vunk/skzz/components/renderer-template-gis'
export type Row = ApiReturnType<typeof rWeixinList>['rows'][0]

export type FIRS<P extends string = string> = FormItemRendererSource<P>
  | ElRowSource<FIRS<P>>
  | ElColSource<FIRS<P>>
  | VkfFlexSource<FIRS<P>>
  | __VkRendererTemplateGis.VkGeoinputSource<P>

export type FIRSCore<P extends string = string> = Exclude<FormItemRendererSource<P>, ComponentSource>
  | __VkRendererTemplateGis.VkGeoinputSource<P>
  
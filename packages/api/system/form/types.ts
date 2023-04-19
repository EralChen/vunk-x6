import { FormItemRendererSource, ElColSource, ElRowSource, VkfFlexSource, ComponentSource } from '@vunk/form'
import { __VkRendererTemplateGis } from '@vunk/skzz/components/renderer-template-gis'

export type FIRS<P extends string = string> = FormItemRendererSource<P>
  | ElRowSource<FIRS<P>>
  | ElColSource<FIRS<P>>
  | VkfFlexSource<FIRS<P>>
  | __VkRendererTemplateGis.VkGeoinputSource<P>

export type FIRSCore<P extends string = string> = Exclude<FormItemRendererSource<P>, ComponentSource>
  | __VkRendererTemplateGis.VkGeoinputSource<P>
  

export type DBInfo = {
  prop: string,
  type: 'Number' | 'String' | 'Boolean' | 'Geometry' | 'Date' 
  geometryType?: 'Point' | 'Line' | 'Polygon'
}

export type CommonAddition = {
  founder: string // 创建人id
  founderName: string // 创建人姓名
  foundTime: string // 创建时间
  updater: string // 更新人id
  updaterName: string // 更新人姓名
  updateTime: string // 更新时间
}

export type FormList = CForm & CommonAddition


export type CForm = {
  id: string
  formName: string
  form?: FIRS[]
}
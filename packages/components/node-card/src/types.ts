import type { PortManager } from '@antv/x6/es/model/port'
import type { __VkNodeComponent } from '@vunk-x16/components/node-component'

export type DefaultGroup = __VkNodeComponent.DefaultGroup

export type SlotArgument = __VkNodeComponent.SlotArgument

export type Port = PortManager.PortMetadata & {
  group?: DefaultGroup
}

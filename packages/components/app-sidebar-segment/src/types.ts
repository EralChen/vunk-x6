import type { __VkSegmentRenderer } from '@vunk/core/components/segment-renderer'

export interface SidebarProps {
  tabsModelValue: string
}

export interface AppSidebarSegmentRendererContext extends __VkSegmentRenderer.SegmentRendererContext {
  attrs: {
    'sidebar-props': SidebarProps
  }
}

export type UseAppSidebarSegmentViewContext = () => AppSidebarSegmentRendererContext

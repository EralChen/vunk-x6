import type { UseAppSidebarSegmentViewContext } from './src/types'

import { createSegmentRenderer } from '@vunk/core/components/segment-renderer'

export * as __VkAppSidebarSegment from './src/types'

const {
  Segment: VkAppSidebarSegment,
  SegmentRenderer: VkAppSidebarSegmentRenderer,
  SegmentView: VkAppSidebarSegmentView,
  useSegmentRendererContext,
} = createSegmentRenderer(Symbol('sidebar'))

const useAppSidebarSegmentViewContext = useSegmentRendererContext as UseAppSidebarSegmentViewContext

export {
  useAppSidebarSegmentViewContext,
  VkAppSidebarSegment,
  VkAppSidebarSegmentRenderer,
  VkAppSidebarSegmentView,
}

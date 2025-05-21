import { createSegmentRenderer } from '@vunk/core/components/segment-renderer'

const {
  Segment: VkAppSidebarSegment,
  SegmentRenderer: VkAppSidebarSegmentRenderer,
  SegmentView: VkAppSidebarSegmentView,
} = createSegmentRenderer(Symbol('sidebar'))

export {
  VkAppSidebarSegment,
  VkAppSidebarSegmentRenderer,
  VkAppSidebarSegmentView,
}

import { useResizeObserver } from '@vueuse/core'
import { useGraph } from '@vunk-x16/composables'
import { computed, ref } from 'vue'

function isReallyVisible (element: HTMLElement) {
  if (!element || !element.getBoundingClientRect)
    return false

  const style = window.getComputedStyle(element)
  if (style.display === 'none' || style.visibility === 'hidden' || Number.parseFloat(style.opacity) === 0) {
    return false // 本身不可见
  }

  const rect = element.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0)
    return false // 不占空间

  const points = [
    [rect.left + 1, rect.top + 1],
    [rect.right - 1, rect.top + 1],
    [rect.left + 1, rect.bottom - 1],
    [rect.right - 1, rect.bottom - 1],
    [rect.left + rect.width / 2, rect.top + rect.height / 2],
  ]

  // 检查每个点是否真的在元素之上
  return points.some(([x, y]) => {
    const topElement = document.elementFromPoint(x, y)
    return element === topElement || element.contains(topElement)
  })
}

export function useGraphVisible () {
  const graph = useGraph()
  const graphDivVisible = ref(true)

  const graphDivVisibleReadonly = computed(() => {
    return graphDivVisible.value
  })
  const checkGraphVisibility = () => {
    graphDivVisible.value = isReallyVisible(graph.container)
  }

  useResizeObserver(graph.container, checkGraphVisibility)

  return [graphDivVisibleReadonly, checkGraphVisibility] as const
}

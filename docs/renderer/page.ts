import { AnyFunc } from '@vunk/core'
import { onUnmounted } from 'vue'
export let contentUpdatedCallbacks: AnyFunc[] = []


/**
 * Register callback that is called every time the markdown content is updated
 * in the DOM.
 */
export function onContentUpdated (fn: AnyFunc) {
  contentUpdatedCallbacks.push(fn)
  onUnmounted(() => {
    contentUpdatedCallbacks = contentUpdatedCallbacks.filter((f) => f !== fn)
  })
}


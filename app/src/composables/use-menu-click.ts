import { createSharedComposable } from '@vueuse/core'
import { onScopeDispose } from 'vue'

function useMenuClick () {
  document.addEventListener('click', upLinkClickToItem)
  onScopeDispose(() => {
    document.removeEventListener('click', upLinkClickToItem)
  })

  function upLinkClickToItem (e: MouseEvent) {
    const path = e.composedPath()
    const elMenuItem = path.find((item) => {
      return item instanceof Element && item.classList.contains('el-menu-item')
    }) as HTMLElement

    if (elMenuItem) {
      elMenuItem.getElementsByTagName('a')[0]?.click()
    }
  }
}

export const useSharedMenuClick = createSharedComposable(useMenuClick)

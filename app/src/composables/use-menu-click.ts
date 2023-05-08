import { onScopeDispose } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { ToggleHandler } from '@vunk/core/shared/utils-class'
const useMenuClick = () => {
  class ListenerToggle extends ToggleHandler {
    add () {
      document.addEventListener('click', upLinkClickToItem)
      this.removeHandler = () => {
        document.removeEventListener('click', upLinkClickToItem)
      }
    }
  }
  const listenerToggle = new ListenerToggle()
 
  listenerToggle.add()

  onScopeDispose(() => {
    listenerToggle.remove()
  })

  function upLinkClickToItem (e: MouseEvent) {
    console.log(e)
    const path = e.composedPath()
    const elMenuItem = path.find((item) => {
      return item instanceof Element && item.classList.contains('el-menu-item')
    }) as HTMLElement

    if (elMenuItem) {

      //  elMenuItem.getElementsByTagName('a')[0]?.click()                 
    }
  }

  return {
    listenerToggle,
  }
}

export const useSharedMenuClick = createSharedComposable(useMenuClick)


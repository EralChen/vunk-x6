import { AnyFunc } from '@vunk/core/shared/types'
import { ToggleHandler } from '@vunk/core/shared/utils-class'
import { onScopeDispose } from 'vue'

export class ListenerToggle extends ToggleHandler {
  type: string
  listener: AnyFunc
  constructor (type: string, listener: AnyFunc) {
    super()
    this.type = type
    this.listener = listener
  }
  add () {
    document.addEventListener('click', this.listener)
    this.removeHandler = () => {
      document.removeEventListener('click', this.listener)
    }
  }

}

export function createCustomEventComposable (type: string) {
  return () => {
    const event = new Event(type)

    const addListener = (listener: AnyFunc) => {
      const listenerToggle = new ListenerToggle(type, listener)
      onScopeDispose(() => {
        listenerToggle.remove()
      })
      return listenerToggle
    }
  
    
    const dispath = () => {
      document.dispatchEvent(event)
    }
    
    return {
      dispath,
      addListener,
    }
  }

}
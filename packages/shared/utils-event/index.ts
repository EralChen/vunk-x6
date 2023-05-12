import { AnyFunc } from '@vunk/core/shared/types'
import { ToggleHandler } from '@vunk/core/shared/utils-class'

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
import { Button } from '@skzz-platform/api/system/button'
import { Directive } from 'vue'

export const vButton:Directive<
  HTMLDivElement
> = async (
  el, 
  binding, 
) => {
  const { arg, value } = binding
  const v: Button[] = await value
  console.log(v)
  const hasPermission  = v.some(item => item.buttonId === arg) 
  if (!hasPermission) {
    el.style.display = 'none'
  } else {
    el.style.removeProperty('display')
  }

}


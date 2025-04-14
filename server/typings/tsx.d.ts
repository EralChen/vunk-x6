import type { VNode } from '@vue/runtime-core'
import type { NormalObject } from '@vunk/shared'

declare global {
  namespace JSX {
    export interface Element extends VNode {}
    export interface ElementClass {
      $props: NormalObject
    }
    export interface ElementAttributesProperty {
      $props: NormalObject
    }
    export interface IntrinsicAttributes extends NormalObject {

    }
  }
}

export {}

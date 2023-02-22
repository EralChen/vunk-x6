<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent, getCurrentInstance, provide } from 'vue'
import { SkMultipage, _SkMultipageCtx } from '@skzz-platform/components/multipage'
import { VM } from './types'
import { AnyFunc } from '@vunk/core'

export default defineComponent({
  name: 'SkMultipageRenderer',
  inheritAttrs: false,
  components: {
    SkMultipage,
  },
  emits,
  props,
  data () {
    return {
      items: new Map(),
    }
  },
  computed: {
    modules (this: VM['data']) {
      return Array.from(this.items.values()).map((item) => item.module)
    },
    slots (this: VM['data']) {
      return Array.from(this.items.entries()).reduce((a, c) => {
        const [key, value] = c
        return a.concat([
          {
            name: key + '',
            render: value.slots.default,
          },
          {
            name: `${key}__options`,
            render: value.slots.options,
          },
        ])
      }, [] as { name: string, render: AnyFunc }[])
    },
  },
  setup (props, { emit }) {
    const vm = getCurrentInstance()
    const coreProps = _SkMultipageCtx.createBindProps(props)
    const coreEmits = _SkMultipageCtx.createOnEmits(emit)
    provide('skMultipageRenderer', vm)

    return {
      coreProps,
      coreEmits,
    }
  },
})
</script>
<template>
  <SkMultipage
    v-bind="{
      ...coreProps,
      ...$attrs,
    }"
    v-on="coreEmits"
    :modules="modules"

  >
    <template 
      v-for="item of slots"
      :key="item.name"
      v-slot:[item.name]="slotProps"
    >
      <component :is="item.render" v-bind="slotProps" />
    </template>
  </SkMultipage>

  <slot></slot>
</template>

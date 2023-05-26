<script lang="ts">
import { props, emits, createBindProps, createOnEmits } from './ctx'
import { computed, defineComponent, provide } from 'vue'
import { ElDialog } from 'element-plus'
export default defineComponent({
  name: 'SkAppDialog',
  components: {
    ElDialog,
  },
  props,
  emits,
  setup (props, { emit, slots }) {
    const coreProps = createBindProps(props)
    const coreEmits = createOnEmits(emit)
    const hasFooter = computed(() => !!slots.footer)  
    provide('skAppDialogProps', props)
   
    return {
      coreProps,
      coreEmits,
      hasFooter,
    }
  },
})
</script>
<template>
  <ElDialog
    class="app-dialog"
    
    v-bind="coreProps"
    v-on="coreEmits"
  >
    <template #header>
      <slot name="header" />
    </template>
    
    <slot />
    
    <template
      v-if="hasFooter"
      #footer
    >
      <slot name="footer" />
    </template>
  </ElDialog>
</template>
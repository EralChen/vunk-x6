<script lang="ts">
import { props, emits, createBindProps, createOnEmits } from './ctx'
import { computed, defineComponent } from 'vue'
import { ElDialog } from 'element-plus'
export default defineComponent({
  name: 'SkAppDialog',
  components: {
    ElDialog,
  },
  emits,
  props,
  setup (props, { emit, slots }) {
    const coreProps = createBindProps(props)
    const coreEmits = createOnEmits(emit)
    const hasFooter = computed(() => !!slots.footer)  
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
      <slot name="header"></slot>
    </template>
    
    <slot></slot>
    
    <template #footer v-if="hasFooter">
      <slot name="footer"></slot>
    </template>
  </ElDialog>
</template>
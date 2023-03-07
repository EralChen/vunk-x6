<script lang="ts">
import { props, emits, createBindProps, createOnEmits } from './ctx'
import { defineComponent } from 'vue'
import { ElDialog } from 'element-plus'
export default defineComponent({
  name: 'SkAppDialog',
  components: {
    ElDialog,
  },
  emits,
  props,
  setup (props, { emit }) {
    const coreProps = createBindProps(props)
    const coreEmits = createOnEmits(emit)
    return {
      coreProps,
      coreEmits,
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
  </ElDialog>
</template>
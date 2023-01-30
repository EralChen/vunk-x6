<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent } from 'vue'
import { VkfForm, _VkfFormCtx } from '@vunk/form'
import { VkfFormItemRendererTemplateLayout } from '@vunk/form/components/form-item-renderer-template-layout'
export default defineComponent({
  name: 'SkAppForm',
  components: {
    VkfForm, VkfFormItemRendererTemplateLayout,
  },
  emits,
  props,
  setup (props, { emit }) {
    const coreProps = _VkfFormCtx.createBindProps(props)
    const coreEmits = _VkfFormCtx.createOnEmits(emit)
    return {
      coreProps,
      coreEmits,
    }
  },
})
</script>
<template>
  <VkfForm 
    v-bind="coreProps" 
    v-on="coreEmits"
  >
    <template #rendererTemplate>
      <VkfFormItemRendererTemplateLayout></VkfFormItemRendererTemplateLayout>
    </template>
  </VkfForm>
</template>

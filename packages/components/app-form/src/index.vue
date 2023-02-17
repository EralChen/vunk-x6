<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent } from 'vue'
import { VkfForm, _VkfFormCtx, VkfFormItemRendererTemplate } from '@vunk/form'
import { VkfFormItemRendererTemplateLayout } from '@vunk/form/components/form-item-renderer-template-layout'
import { SkCssColorPicker } from '@skzz-platform/components/css-color-picker'
export default defineComponent({
  name: 'SkAppForm',
  components: {
    VkfForm, VkfFormItemRendererTemplateLayout,
    VkfFormItemRendererTemplate,
    SkCssColorPicker,
  },
  emits,
  props,
  setup (props, { emit }) {
    const coreProps = _VkfFormCtx.createBindProps(props)
    const coreEmits = _VkfFormCtx.createOnEmits(emit)
    
    return {
      coreProps,
      coreEmits,
      log (e) {
        console.log('log', e)
      },
    }
  },
})
</script>
<template>
  <VkfForm 
    v-bind="coreProps" 
    v-on="coreEmits"
    @keydown.enter.prevent="log"
  >
    <template #rendererTemplate>
      <VkfFormItemRendererTemplateLayout></VkfFormItemRendererTemplateLayout>
      <VkfFormItemRendererTemplate :type="'SkCssColorPicker'">
        <template #default="{ data: bindProps }">
          <SkCssColorPicker
            v-bind="bindProps"
            :modelValue="data[bindProps.prop]"
            @update:modelValue="$emit('setData', {
              k: bindProps.prop,
              v: $event,
            })"
          ></SkCssColorPicker>
        </template>
      </VkfFormItemRendererTemplate>
    </template>
  </VkfForm>
</template>

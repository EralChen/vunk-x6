<script lang="tsx" setup>
import { useNode } from '@vunk-x16/composables'
import { VkfFormItemRendererTemplate } from '@vunk/form'
import { VkfFormItem } from '@vunk/form/components/form-item'

const node = useNode()
function labelRender (props) {
  return <span>{ props.label }</span>
}
console.log('Port.vue', node)
</script>

<template>
  <VkfFormItemRendererTemplate type="VkPort">
    <template #default="{ props }">
      <VkfFormItem
        :information="true"
        class="vkf-information-templates-default-main"
        :form-item-slots="{
          label: () => labelRender(props),
          labelActions: () => null,
        }"
      >
      </VkfFormItem>
    </template>
  </VkfFormItemRendererTemplate>
</template>

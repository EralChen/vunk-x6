<script lang="tsx" setup>
import { VkPort } from '@vunk-x16/components/port'
import { useNode } from '@vunk-x16/composables'
import { VkfFormItemRendererTemplate } from '@vunk/form'
import { VkfFormItem } from '@vunk/form/components/form-item'

const node = useNode()

// 将连接桩转移到指定位置, 设置 markup 容器， 在 graph 上渲染，渲染完成后，转移到该位置
function labelRender (props) {
  return (
    <>
      <VkPort group="absolute">
        <div>test</div>
      </VkPort>
      <span>{ props.label }</span>
    </>
  )
}
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

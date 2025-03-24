<script lang="ts">
import { VkfFormItemRendererTemplate } from '@vunk/form'
import { VkfFormItem } from '@vunk/form/components/form-item'
import { VkfInformationTemplatesDefault } from '@vunk/form/components/information-templates-default'
import { VkfTagInformation } from '@vunk/form/components/tag-information'
import { defineComponent } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkInformationTemplates',
  components: {
    VkfInformationTemplatesDefault,
    VkfFormItemRendererTemplate,
    VkfTagInformation,
    VkfFormItem,
  },
  props,
  emits,
})
</script>

<template>
  <VkfInformationTemplatesDefault />
  <VkfFormItemRendererTemplate type="VkfInputCollection">
    <template #default="{ props, value }">
      <VkfFormItem
        class="vk-information-templates-input-collection-main vkf-information-templates-default-main"
        :label="props.label"
        :prop="props.prop"
        :information="true"
      >
        <div
          class="vk-information-templates-input-collection-value"
        >
          <VkfTagInformation
            v-for="(item, index) of value"
            :key="index"
            :label-render="props.summaryLabel"
            :data="item"
            :form-items="props.columns.map(v => {
              return {
                ...v,
                ...v.templateProps?.createTemplateProps?.({
                  row: item,
                }),
              }
            })"
          ></VkfTagInformation>
        </div>
      </VkfFormItem>
    </template>
  </VkfFormItemRendererTemplate>
</template>

<style>
.vk-information-templates-input-collection-value {
  display: grid;
  grid-template-columns: repeat(2, minmax(80px, 1fr));
  gap: 8px;
  width: 100%;
}

.vk-information-templates-input-collection-value .vkf-tag-information__tag + .vkf-tag-information__tag {
  margin-left: 0;
}
</style>

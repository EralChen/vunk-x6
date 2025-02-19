<script lang="ts">
// import type {} from '@sxzz/popperjs-es'
import { VkfFormItem } from '@vunk/form/components/form-item'
import { VkfFormItemRendererTemplate } from '@vunk/form/components/form-item-renderer-template'
import { VkfSelect } from '@vunk/form/components/select'
import { VkfTagInformation } from '@vunk/form/components/tag-information'
import { defineComponent } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkfInformationTemplatesDefault',
  components: {
    VkfFormItem,
    VkfFormItemRendererTemplate,
    VkfTagInformation,
    VkfSelect,
  },
  props,
  emits,
  setup (props, { emit }) {
    const prefixCls = 'vkf-information-templates-default'

    const simpleStringTemplates = [
      'VkfInput',
      'VkfInputNumber',
      'VkfSlider',
    ]

    const simpleSelectTemplates = [
      'VkfSelect',
      'VkfRadio',
    ] as const

    const simpleCollectionTemplates = [
      'VkfInputCollection',
    ]
    return {
      prefixCls,
      simpleStringTemplates,
      simpleSelectTemplates,
      simpleCollectionTemplates,
    }
  },
})
</script>

<template>
  <VkfFormItemRendererTemplate
    v-for="t of simpleStringTemplates"
    :key="t"
    :type="t"
  >
    <template #default="{ props, value }">
      <VkfFormItem
        :class="`${prefixCls}-main`"
        :label="props.label"
        :prop="props.prop"
        :information="true"
      >
        <div :class="`${prefixCls}-value`">
          {{ value }}
        </div>
      </VkfFormItem>
    </template>
  </VkfFormItemRendererTemplate>

  <VkfFormItemRendererTemplate
    v-for="t of simpleSelectTemplates"
    :key="t"
    :type="t"
  >
    <template #default="{ props, value }">
      <VkfSelect
        :label="props.label"
        :information="true"
        :class="`${prefixCls}-main`"
        :readonly="true"
        :model-value="value"
        :options="props.options"
      ></VkfSelect>
    </template>
  </VkfFormItemRendererTemplate>

  <VkfFormItemRendererTemplate
    v-for="t of simpleCollectionTemplates"
    :key="t"
    :type="t"
  >
    <template #default="{ props, value }">
      <VkfFormItem
        :class="`${prefixCls}-main`"
        :label="props.label"
        :prop="props.prop"
        :information="true"
      >
        <div :class="`${prefixCls}-value`">
          <VkfTagInformation
            v-for="(item, index) of value"
            :key="index"
            :label-render="props.summaryLabel"
            :data="item"
            :form-items="props.columns.map(v => {
              return {
                ...v,
                ...v.templateProps,
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
.vkf-information-templates-default-main .el-form-item__label {
  color: var(--el-text-color-secondary);
  font-weight: normal;
}

.vkf-information-templates-default-main .el-select__wrapper.el-select__wrapper {
  padding: 0;
  border: none;
  box-shadow: none;

}

.vkf-information-templates-default-main .el-select__selected-item {
  user-select: text;
}
</style>

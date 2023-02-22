<script lang="ts">
import { props, emits } from './ctx'
import { computed, defineComponent } from 'vue'
import { VkfForm, _VkfFormCtx, VkfFormItemRendererTemplate, ElRowSource, ElColSource } from '@vunk/form'
import { VkfFormItemRendererTemplateLayout } from '@vunk/form/components/form-item-renderer-template-layout'
import { SkCssColorPicker } from '@skzz-platform/components/css-color-picker'
import { CoreFormItem, FormItem } from './types'
import { pickObject } from '@vunk/core/shared/utils-object'
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
    const coreProps = _VkfFormCtx.createBindProps(props, ['formItems'])
    const coreEmits = _VkfFormCtx.createOnEmits(emit)
    const createRow = (defaultItem?: ElColSource<FormItem>) => {
      return {
        templateType: 'ElRow',
        gutter: props.rowGutter,
        templateSlots: defaultItem ? [
          defaultItem,
        ] : [],
      } as FormItem
    }

    // 判断 Row 中有多少空位
    const getEmptySlotCount = (row: ElRowSource<ElColSource<FormItem>>) => {
      return 24 - row.templateSlots.reduce((a, c) => {
        if (!c.span) {
          throw new Error('span is required')
        }
        return a + c.span 
      }, 0)
    }

    // 根据当前的 span 包装出 elCol 的数据
    const genColItem = (formItem: CoreFormItem) => {
      return {
        templateType: 'ElCol',
        span: formItem.span || props.span,
        
        templateSlots: [
          pickObject(formItem, {
            excludes: ['span'],
          }),
        ],
      } as ElColSource<CoreFormItem> & { span: number }
    }

    const formItems = computed(() => {
      if (!props.layout) {
        return props.formItems
      } else {
        return props.formItems.reduce((a, c) => {
          // 先看最后一行是否有空位
          const lastRow = a[a.length - 1] as ElRowSource<ElColSource<FormItem>>
          const colItem = genColItem(c)

          // 如果没有空位，就新建一行
          if (!lastRow || getEmptySlotCount(lastRow) < colItem.span) {
            a.push(createRow(colItem))

          } else {
            // 如果有空位，就把当前的 Col 放进去
            lastRow.templateSlots.push(colItem)
          }
          return a
        }, [] as FormItem[])
      }
   
    })
    
    return {
      coreProps,
      coreEmits,
      formItems,
    }
  },
})
</script>
<template>
  <VkfForm 
    v-bind="coreProps" 
    v-on="coreEmits"
    :formItems="formItems"
    @keydown.enter.prevent="$emit('enter', $event)"
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

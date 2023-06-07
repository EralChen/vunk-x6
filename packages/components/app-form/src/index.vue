<script lang="ts">
import { props, emits } from './ctx'
import { computed, defineComponent, nextTick, watch } from 'vue'
import { VkfForm, _VkfFormCtx, VkfFormItemRendererTemplate, ElRowSource, ElColSource } from '@vunk/form'
import { VkfFormItemRendererTemplateLayout } from '@vunk/form/components/form-item-renderer-template-layout'
import { SkCssColorPicker } from '@skzz-platform/components/css-color-picker'
import { CoreFormItem, FormItem } from './types'
import { pickObject } from '@vunk/core/shared/utils-object'
import { _SkAppDialogUse } from '@skzz-platform/components/app-dialog'
import { Deferred } from '@vunk/core/shared/utils-promise'
import type { ElForm } from 'element-plus'
import { AnyFunc, NormalObject } from '@vunk/core/shared/types'
import { PATTERN } from '@skzz-platform/shared/utils-form'
import { SkUpload } from '@skzz-platform/components/upload'
export default defineComponent({
  name: 'SkAppForm',
  components: {
    VkfForm, VkfFormItemRendererTemplateLayout,
    VkfFormItemRendererTemplate,
    SkCssColorPicker,
    SkUpload,
  },
  props,
  emits,
  setup (props, { emit }) {
    const coreProps = _VkfFormCtx.createBindProps(props, ['formItems', 'elRef'])
    const coreEmits = _VkfFormCtx.createOnEmits(emit)

    const dialogProps = _SkAppDialogUse.useProps()
    const formDef = new Deferred<InstanceType<typeof ElForm>>()
    const defResolve = formDef.resolve as AnyFunc
    formDef.promise.then(props.elRef)
    
    watch(() => dialogProps.modelValue, () => {
      nextTick()
        .then(() => formDef.promise)
        .then(el => {
          el.clearValidate()
        })
    })

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
      
      const processFormItems = props.formItems.map((item)  => {
        const message = `${item.label || '该字段'}不能为空`
        const setMsg = (rule: NormalObject) => {
          if (rule.message) return
          if (rule.required) {
            rule.message = message
          } 
      
          if (rule.pattern === PATTERN.normal) {
            rule.message = `输入 ${item.label || '该字段'} 不能包含特殊字符或空格`
          }
          if (rule.pattern === PATTERN.code) {
            rule.message = `输入 ${item.label || '该字段'} 只能由数字或字母组成, 且不能以数字开头`
          }

          if (rule.pattern === PATTERN.password) {
            rule.message = `输入 ${item.label || '该字段'} 只能由字母、数字或特殊字符组成，且长度在8到16之间`
          }

          if (rule.pattern === PATTERN.phone) {
            rule.message = `输入 ${item.label || '该字段'} 不是正确的手机号码`
          }
        }

        if (item.rules) {

          if (Array.isArray(item.rules)) {
            item.rules.forEach(setMsg)
          } else {
            setMsg(item.rules)
          }

        } else if (item.required) {

          item.rules = {
            required: true,
            message,
          }
        }
        if (item.maxlength) {
          item.showWordLimit = true
        }

        return item
      })

      if (!props.layout) {
        return processFormItems
      } else {
        return processFormItems.reduce((a, c) => {
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
      formDef,
      defResolve,
    }
  },
})
</script>
<template>
  <VkfForm 
    v-bind="coreProps" 
    :form-items="formItems"
    :el-ref="defResolve"
    :class="{
      'sk-app-form': true,
      'is-layout': layout,
    }"
    :style="{
      '--gap-form-label': `${labelWidth}`,
    }"
    v-on="coreEmits"
    @keydown.enter.prevent="$emit('enter', $event)"
  >
    <template #rendererTemplate>
      <VkfFormItemRendererTemplateLayout />
      <VkfFormItemRendererTemplate :type="'SkCssColorPicker'">
        <template #default="{ data: bindProps }">
          <SkCssColorPicker
            v-bind="bindProps"
            :model-value="data[bindProps.prop]"
            @update:modelValue="$emit('setData', {
              k: bindProps.prop,
              v: $event,
            })"
          />
        </template>
      </VkfFormItemRendererTemplate>

      <VkfFormItemRendererTemplate
        :type="'VkfUpload'"
      >
        <template #default="{ data: bindProps }">
          <SkUpload
            v-bind="bindProps"
            :model-value="data[bindProps.prop]"
            @update:modelValue="$emit('setData', {
              k: bindProps.prop,
              v: $event,
            })"
          ></SkUpload>
        </template>
      </VkfFormItemRendererTemplate>
    </template>
    <slot></slot>
  </VkfForm>
</template>

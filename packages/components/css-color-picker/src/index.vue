<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent, ref } from 'vue'
import { VkfFormItem, _VkfFormItemCtx } from '@vunk/form/components/form-item'
import { ElRadioGroup, ElRadio, ElColorPicker } from 'element-plus'
import { valid } from 'chroma-js'
export default defineComponent({
  name: 'SkCssColorPicker',
  components: {
    VkfFormItem,
    ElRadioGroup, ElRadio,
    ElColorPicker,
  },
  emits,
  props,
  setup (props) {
    const formItemBindProps = _VkfFormItemCtx.createBindProps(props)

    const currentType = ref(
      valid(props.modelValue) ? '1' : '2',
    )
    
    return {
      formItemBindProps,
      currentType,
    }
  },
})
</script>
<template>
  <VkfFormItem v-bind="formItemBindProps">

      <ElRadioGroup v-model="currentType">
        <el-radio label="1">取色器</el-radio>
        <el-radio label="2">自定义</el-radio>
      </ElRadioGroup>

  </VkfFormItem>

  <VkfFormItem v-bind="formItemBindProps" class="is-sub-form-item">
    <ElColorPicker v-if="currentType === '1'" 
      :showAlpha="true"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
    <ElInput 
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      v-else  
    />
  </VkfFormItem>

</template>
<style>
.el-form-item.is-sub-form-item{
  margin-top: -10px;
}
.el-form-item.is-sub-form-item label{
  visibility: hidden;
}
</style>
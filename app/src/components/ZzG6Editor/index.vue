<template>
  <ZzEditor>
    <slot></slot>
    <template #toolbar>
      <slot name="toolbar"></slot>
    </template>
  </ZzEditor>
</template>

<script setup lang="ts">
import { MaterialNode, ZzEditor, expendForm, extendNodeFormMap } from '@zzg6/flow'
import bindFormItem from './bind-form-item/index.vue'
import { propsOp } from './ctx'
import { computed } from 'vue'


const props = defineProps(propsOp)
const formKey = 'VkfBindFormItem'

expendForm([
  {
    component: bindFormItem,
    type: formKey,
  },
])
extendNodeFormMap(
  MaterialNode.zzRect,
  [{
    templateType: formKey,
    prop: 'formItemKeys',
    label: '绑定表单字段',
    formId: computed(() => props.formId),
  }],
)
</script>

<style lang="scss" scoped></style>
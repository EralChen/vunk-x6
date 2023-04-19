<template>
  <ZzEditor v-bind="editProps">
    <slot></slot>
    <template #toolbar>
      <slot name="toolbar"></slot>
    </template>
    <template #form>
      <slot name="form"></slot>
    </template>
  </ZzEditor>
</template>

<script lang="ts">
import { MaterialNode, ZzEditor, expendForm, extendNodeFormMap } from '@zzg6/flow'
import bindFormItem from './bind-form-item/index.vue'
import { propsOp, bindProps } from './ctx'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: propsOp,
  components: {
    ZzEditor,
  },
  setup (props) {
    const editProps = bindProps(props, ['formId'])

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
        prop: 'formItems',
        label: '绑定表单字段',
        formId: computed(() => props.formId),
      }],
    )
    return {
      editProps,
    }
  },
})

</script>

<style lang="scss" scoped></style>
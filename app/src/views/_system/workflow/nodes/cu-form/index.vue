<script lang="tsx" setup>
import { SkAppForm, __SkAppForm } from '@skzz/platform'
import { computed, PropType, ref  } from 'vue'
import { Media, SetDataEvent } from '@vunk/core'
import { WorkflowNode } from '@skzz-platform/api/system/workflow'

type Row = WorkflowNode

const props = defineProps({
  data: {
    type: Object as PropType<Partial<Row>>,
    default: () => ({}),
  },
  type: {
    type: String as PropType<'c' | 'u' | ''>,
    default: '',
  },
  nodes: {
    type: Array as PropType<WorkflowNode[]>,
    default: () => [],
  },
})
const emit = defineEmits({
  'submit': (data: Partial<Row>) => data,
  'setData': (e: SetDataEvent) => e,
})

const isU = computed(() => props.type === 'u')
const options = computed(() => props.nodes.map((node) => ({
  label: node.name,
  value: node.id,
})))
const formItems = ref<__SkAppForm.FormItem[]>([
  {
    prop: 'name',
    label: '名称',
    templateType: 'VkfInput',
  },
  {
    prop: 'isJointly',
    label: '是否会签',
    templateType: 'VkfSwitch',
    activeValue: 1,
    inactiveValue: 0,
  },
  {
    prop: 'prevNodes',
    label: '上一节点',
    templateType: 'VkfSelect',
    multiple: true,
    options: options as unknown as Media[],
  },
  {
    prop: 'nextNodes',
    label: '下一节点',
    templateType: 'VkfSelect',
    multiple: true,
    options: options as unknown as Media[],
  },

  {
    templateType: 'VkfButton',
    buttonLabel: '提交',
    class: 'is-btn-group',
    type: 'primary',
    size: 'large',
    validate: true,
    onClick: () => {
      emit('submit', props.data)
    },
  },

])

</script>
<template>
  <SkAppForm
    :data="data"
    :labelWidth="'8em'"
    :formItems="formItems"
    @setData="$emit('setData', $event)"
  >
  </SkAppForm>
</template>

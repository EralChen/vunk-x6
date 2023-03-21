<script lang="tsx" setup>
import { SkAppForm, __SkAppForm } from '@skzz/platform'
import { Row } from '../types'
import { ElLink } from 'element-plus'
import { computed, PropType, ref  } from 'vue'
import { SkAppIcon } from '@skzz-platform/components/app-icon'

const props = defineProps({
  data: {
    type: Object as PropType<Partial<Row>>,
    default: () => ({}),
  },
  type: {
    type: String as PropType<'c' | 'u' | ''>,
    default: '',
  },
})
const emit = defineEmits({
  'submit': (data: Partial<Row>) => data,
})

const isU = computed(() => props.type === 'u')
const formItems = ref<__SkAppForm.FormItem<keyof Row>[]>([
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '名称',
  },
  {
    templateType: 'VkfInput',
    prop: 'memo',
    label: '备注',
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
  >
  </SkAppForm>
</template>

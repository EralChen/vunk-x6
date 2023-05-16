<script lang="tsx" setup>
import { SkAppForm, __SkAppForm } from '@skzz/platform'
import { Row } from '../types'
import { computed, PropType, ref  } from 'vue'
import { NormalObject, SetDataEvent } from '@vunk/core'
import { PATTERN } from '@skzz-platform/shared/utils-form'


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
  'setData': (e: SetDataEvent) => e,
})

const isU = computed(() => props.type === 'u')
const formItems = computed<__SkAppForm.FormItem<keyof Row>[]>(() => [
  {
    prop: 'code',
    label: '账号',
    templateType: 'VkfInput',
    placeholder: '请输入账号',
    disabled: isU.value,
    rules: {
      required: true,
      trigger: 'blur',
    },
  },

  {
    templateType: 'VkfSwitch',
    prop: '_uPassword' as any,
    label: '修改密码',
    templateIf: isU.value,
    defaultModelValue: false,
  },


  {
    prop: 'password',
    label: '密码',
    templateType: 'VkfInput',
    placeholder: '请输入密码',
    showPassword: true,
    required: true,
    templateIf: (data) => !isU.value || data?._uPassword,
    rules: [
      {
        required: true,
      },
      {
        pattern: PATTERN.password,
        trigger: 'blur',
      },
    ],
  },
  
  {
    prop: 'name',
    label: '姓名',
    templateType: 'VkfInput',
    placeholder: '请输入姓名',
  },
  {
    prop: 'mobile',
    label: '手机号',
    templateType: 'VkfInput',
    rules: [

      {
        pattern: PATTERN.phone,
        trigger: 'blur',
      },
    ],

  },
  {
    prop: 'sex',
    label: '性别',
    templateType: 'VkfRadio',
    options: [
      {
        label: '男',
        value: 1,
      },
      {
        label: '女',
        value: 0,
      },
    ],
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

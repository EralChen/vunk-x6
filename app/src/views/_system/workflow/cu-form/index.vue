<script lang="tsx" setup>
import { SkAppForm, __SkAppForm } from '@skzz/platform'
import { Row } from '../types'
import { ElButton } from 'element-plus'
import { PropType, ref  } from 'vue'
import { SetDataEvent } from '@vunk/core'
import { snowFlake } from '@skzz/platform/api/basic'

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

// const isU = computed(() => props.type === 'u')
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
    templateType: 'VkfInput',
    prop: 'itemId',
    label: '业务关联ID',
    inputSlots: {
      append: () => <ElButton
        onClick={ async () =>  {
          const itemId = await snowFlake()
          emit('setData', {
            k: 'itemId',
            v: itemId,
          })
        } }
      >
        生成
      </ElButton>,
    },
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

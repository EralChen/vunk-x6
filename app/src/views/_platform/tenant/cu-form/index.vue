<script lang="ts">
import { computed, defineComponent } from 'vue'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { Row } from '../types'
import { PATTERN } from '@skzz-platform/shared/utils-form'
import { SetDataEvent } from '@vunk/core'

export default defineComponent({
  components: {
    SkAppForm,
  },
  props: ['data', 'type'],
  emits: {
    submit: (data: Row) => data,
    setData: (e: SetDataEvent) => e,
  },
  setup (props, { emit }) {
    const isU = computed(() => props.type === 'u')

    const formItems = computed(() => [
      {
        templateType: 'VkfInput',
        prop: 'tenantId',
        label: '租户ID',
        maxlength: 10,
        rules: [
          {
            required: true,
          },
          {
            pattern: PATTERN.code,
          },
        ],
      },
      {
        templateType: 'VkfInput',
        prop: 'name',
        label: '租户名称',
        maxlength: 10,
        rules: [
          {
            required: true,
          },
          {
            pattern: PATTERN.normal,
          },
        ],
      },

      {
        templateType: 'VkfSwitch',
        prop: '$manager',
        label: '管理员',
        templateIf: !isU.value,
        onChange (v) {
          if (!v) {
            // 清空管理员账号密码
            emit('setData', {
              k: 'username',
              v: undefined,
            })
            emit('setData', {
              k: 'password',
              v: undefined,
            })
          }
        },

      },

      {
        templateType: 'VkfInput',
        prop: 'username',
        label: '账号',
        templateIf: (data) => data?.$manager,
        rules: [
          {
            required: true,
          },
          {
            pattern: PATTERN.code,
          },
        ],
      },

      {
        templateType: 'VkfInput',
        prop: 'password',
        label: '密码',
        templateIf: (data) => data?.$manager,
        rules: [
          {
            required: true,
          },
          {
            pattern: PATTERN.password,
          },
        ],

      },

      {
        templateType: 'VkfButton',
        buttonLabel: '提交',
        type: 'primary',
        size: 'large',
        class: 'is-btn-group',
        onClick: () => {
          emit('submit', props.data)
        },
      },
    ] as __SkAppForm.CoreFormItem<
     keyof Row | '_user'
    >[]) 
    return {
      formItems,
    }
  },
})
</script>
<template>
  <SkAppForm 
    :labelWidth="'6em'"
    :data="data"
    :formItems="formItems"
    @setData="$emit('setData', $event)"
  ></SkAppForm>
</template>

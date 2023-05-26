<script lang="ts">
import { PropType, computed, defineComponent } from 'vue'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { Row } from '../types'
import { PATTERN } from '@skzz-platform/shared/utils-form'
import { SetDataEvent } from '@vunk/core'

export default defineComponent({
  components: {
    SkAppForm,
  },
  props: {
    data: {
      type: Object as PropType<Partial<Row>>,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
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
        prop: '$admin',
        label: '新建管理员',
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
        prop: 'adminUser',
        label: '账号',
        templateIf: (data) => data?.$admin,
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
        prop: 'adminPassword',
        label: '密码',
        templateIf: (data) => data?.$admin,
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
          emit('submit', props.data as Row)
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
    :label-width="'6em'"
    :data="data"
    :form-items="formItems"
    @setData="$emit('setData', $event)"
  />
</template>

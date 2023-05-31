<script lang="ts" setup>
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { uUserPassword } from '@skzz-platform/api/login'
import { FirstParameter, setData } from '@vunk/core'
import { PATTERN } from '@skzz-platform/shared/utils-form'
import { computed, reactive } from 'vue'
import { useUserStore } from '@skzz-platform/stores/user'


const emit = defineEmits({
  'submitted': null,
})

type Row = FirstParameter<typeof uUserPassword>
const userStore = useUserStore()
const userInfo = computed(() => userStore.getUserInfo())

const data = reactive({
  
}) as Row
const formItems:__SkAppForm.FormItem<keyof Row>[] = [
  {
    prop: 'password',
    label: '旧密码',
    templateType: 'VkfInput',
    showPassword: true,
    required: true,
  },
  {
    prop: 'newPassword',
    label: '新密码',
    templateType: 'VkfInput',
    showPassword: true,
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
    templateType: 'VkfButton',
    buttonLabel: '提交',
    type: 'primary',
    size: 'large',
    class: 'is-btn-group',
    onClick: u,
  },
]

function u () {

  return uUserPassword({
    ...data,
    uid: userInfo.value.id + '',
  }).then(() => {
    emit('submitted')
  })
}
</script>
<template>
  <SkAppForm
    :form-items="formItems"
    :data="data"
    @setData="setData(data, $event)"
  ></SkAppForm>
</template>

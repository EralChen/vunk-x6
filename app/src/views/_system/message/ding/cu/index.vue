<script lang="ts" setup>
import { SkAppForm, __SkAppForm } from '@skzz/platform/components/app-form'
import { cuDing, rDingList, CDing } from '@skzz/platform/api/system/message'
import { Deferred } from '@vunk/core/shared/utils-promise'
import { ElMessage, FormInstance } from 'element-plus'
import { SkAppCard } from '@skzz/platform'
import PageX from '_c/PageX/index.vue'
import { setData } from '@vunk/core'
import { ref } from 'vue'
import router from '@/router'


const props = defineProps({
  id: {
    type: String,
  },
  detail: Boolean,
})
const firstFormData = ref({
  id: props.id,
} as CDing)

const header = ref(props.detail ? '详情' : props.id ? '修改' : '新增')

const defer = new Deferred<FormInstance>()

const formItems = ref<__SkAppForm.CoreFormItem[]>([
  {
    templateType: 'VkfInput',
    prop: 'userAccessKey',
    label: 'userAccessKey',
  },
  {
    templateType: 'VkfInput',
    prop: 'userSecretKey',
    label: 'userSecretKey',
  },
  {
    templateType: 'VkfInput',
    prop: 'domainName',
    label: 'domainName',
  },
  {
    templateType: 'VkfInput',
    prop: 'senderId',
    label: 'senderId',
  },
  {
    templateType: 'VkfInput',
    prop: 'tenantId',
    label: '租户id',
  },
])
const rules = ref({
  userAccessKey: [
    {
      required: true,
      message: '请输入userAccessKey',
      trigger: 'blur',
    },
  ],
  userSecretKey: [
    {
      required: true,
      message: '请输入userSecretKey',
      trigger: 'blur',
    },
  ],
  domainName: [
    {
      required: true,
      message: '请输入domainName',
      trigger: 'blur',
    },
  ],
  senderId: [
    {
      required: true,
      message: '请输入senderId',
      trigger: 'blur',
    },
  ],
  tenantId: [
    {
      required: true,
      message: '请输入tenantId',
      trigger: 'blur',
    },
  ],
})

const r = () => {
  rDingList(undefined, { id: props.id })
    .then(res => {
      firstFormData.value = res.rows[0]
    })
}
props.id && r()
const c = () => {
  defer.promise.then((form) => {
    return form.validate()
  })
    .then((valid) => {
      if (valid) {
        return cuDing(firstFormData.value, !!props.id)
      }
    })
    .catch(() => {
      ElMessage.warning('请检查表单')
    })
    .then(() => {
      router.push('/system/message/ding')
    })
}

</script>
<template>
  <PageX>
    <SkAppCard class="h-100%" :header="`专有钉钉${header}`">
      <template #header__options>
        <ElButton type="primary" @click="c">提交</ElButton>
      </template>

      <ElScrollbar>
        <div class="gap-form-x">
          <SkAppForm :elRef="defer.resolve" :disabled="props.detail" :rules="rules" :labelPosition="'top'" :layout="true" :formItems="formItems"
            :data="firstFormData" @setData="setData(firstFormData, $event)">
          </SkAppForm>
        </div>
      </ElScrollbar>
    </SkAppCard>
  </PageX>
</template>

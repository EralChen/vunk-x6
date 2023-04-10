<script lang="ts" setup>
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { cuWeixin, rWeixinList, CWeixin } from '@skzz-platform/api/system/message'
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
} as CWeixin)

const header = ref(props.detail ? '详情' : props.id ? '修改' : '新增')

const defer = new Deferred<FormInstance>()

const formItems = ref<__SkAppForm.CoreFormItem[]>([
  {
    templateType: 'VkfInput',
    prop: 'appId',
    label: 'appId',
  },
  {
    templateType: 'VkfInput',
    prop: 'secret',
    label: 'secret',
  },
  {
    templateType: 'VkfInput',
    prop: 'token',
    label: 'token',
  },
  {
    templateType: 'VkfInput',
    prop: 'aesKey',
    label: 'aesKey',
  },
  {
    templateType: 'VkfInput',
    prop: 'msgDataFormat',
    label: 'msgDataFormat',
  },
  {
    templateType: 'VkfInput',
    prop: 'applicationId',
    label: 'applicationId',
  },
  {
    templateType: 'VkfInput',
    prop: 'tenantId',
    label: 'tenantId',
  },
])
const rules = ref({
  appId: [
    {
      required: true,
      message: '请输入appId',
      trigger: 'blur',
    },
  ],
  secret: [
    {
      required: true,
      message: '请输入secret',
      trigger: 'blur',
    },
  ],
  token: [
    {
      required: true,
      message: '请输入token',
      trigger: 'blur',
    },
  ],
  aesKey: [
    {
      required: true,
      message: '请输入aesKey',
      trigger: 'blur',
    },
  ],
  msgDataFormat: [
    {
      required: true,
      message: '请输入msgDataFormat',
      trigger: 'blur',
    },
  ],
  applicationId: [
    {
      required: true,
      message: '请输入applicationId',
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
  rWeixinList(undefined, { id: props.id })
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
        return cuWeixin(firstFormData.value, !!props.id)
      }
    })
    .catch(() => {
      ElMessage.warning('请检查表单')
    })
    .then(() => {
      router.push('/system/message/weixin')
    })
}

</script>
<template>
  <PageX>
    <SkAppCard class="h-100%" :header="`微信${header}`">
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

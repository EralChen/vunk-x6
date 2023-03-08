<script lang="ts" setup>
import PageOver from '_c/PageOver/index.vue'
import { SkAppCard } from '@skzz-platform/components/app-card'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'

defineProps({
  uid: {
    type: String,
    default: '',
  },
})

const formItems:__SkAppForm.CoreFormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '姓名',
  },
  {
    templateType: 'VkfInput',
    prop: 'roleId',
    label: '编码',
  },
]
</script>
<template>
  <PageOver>
    <SkAppCard :header="'新增角色'" class="h-full">
      <template #header__options>
        <ElButton type="primary"
        
        >提交</ElButton>
      </template>
      <div class="gap-form-x"> 
        <SkAppForm
          :layout="true"
          :labelPosition="'top'"
          :formItems="formItems"
        ></SkAppForm>
      </div>
    </SkAppCard>
  </PageOver>
</template>

<script lang="ts" setup>
import { SkAppQueryForm, __SkAppQueryForm } from '@skzz-template/components/app-query-form'
import { setData } from '@vunk/core'
import { ElForm, ElMessage } from 'element-plus'
import { reactive } from 'vue'
const formItems:__SkAppQueryForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '姓名',
    required: true,
  },
  {
    templateType: 'VkfInput',
    prop: 'age',
    label: '年龄',
    required: true,
  },
  {
    templateType: 'VkfSelect',
    prop: 'city',
    label: '城市',
  },
  {
    templateType: 'VkfInput',
    prop: 'name1',
    label: '姓名',
  },
  {
    templateType: 'VkfInput',
    prop: 'age1',
    label: '年龄',
  },
  {
    templateType: 'VkfSelect',
    prop: 'city1',
    label: '城市',
  },
  {
    templateType: 'VkfInput',
    prop: 'name2',
    label: '姓名',
    required: true,
  },
  {
    templateType: 'VkfInput',
    prop: 'age2',
    label: '年龄',
  },
  {
    templateType: 'VkfSelect',
    prop: 'city2',
    label: '城市',
  },
]
const formData = reactive({
  
})
const submit = (forms: InstanceType<typeof ElForm>[]) => {
  Promise.all(forms.map(form => form.validate())).then(() => {
    ElMessage('成功')
  }).catch(() => {
    ElMessage('请检查表单')
  })
}
</script>
<template>
  <SkAppQueryForm
    :data="formData"
    @setData="setData(formData, $event)"
    :fixes="1"
    :formItems="formItems"
  >
    <template #options="{ forms }">
      <el-button type="primary" @click="submit(forms)">查询</el-button>
    </template>
  </SkAppQueryForm>
</template>
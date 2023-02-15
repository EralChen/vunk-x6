<script lang="ts" setup>
import { SkAppQueryForm, __SkAppQueryForm } from '@skzz-platform/components/app-query-form'
import { setData } from '@vunk/core'
import { ElForm, ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
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
const formExpand = ref(false)
const formData = reactive({
  
})
const submit = (forms: InstanceType<typeof ElForm>[]) => {
  const [baseForm, expandForm] = forms
  // 当 expandForm 验证不成功时, 打开 formExpand
  Promise.allSettled([
    baseForm.validate(), 
    expandForm.validate(),
  ]).then(results => {
    if (results[1].status === 'rejected') {
      formExpand.value = true
    }
    if (results.every(result => result.status === 'fulfilled')) {
      ElMessage.success('验证成功')
    }
  })
}
</script>
<template>
  <SkAppQueryForm
    v-model:expand="formExpand"
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
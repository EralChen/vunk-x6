<script lang="ts" setup>
import { ref } from 'vue'
import { SkAppForm } from '@skzz-platform/components/app-form'
import PageX from '_c/PageX/index.vue'
import { SkAppCard, SkMultipage, __SkMultipage } from '@skzz/platform'

const modules: __SkMultipage.Module[] = [
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
  },
  {
    label: '选项三',
    value: '3',
  },
]
const currentPage = ref('1')

</script>
<template>
  <PageX>
    <SkAppCard :header="'多列表单'" :class="'h-100%'">
      <template #header__options>
        <ElButton type="primary">提交</ElButton>
      </template>
      <SkMultipage  v-model="currentPage" :modules="modules" 
        :tabXClass="'plr-form-pl'">



      </SkMultipage>
    </SkAppCard>
  </PageX>
</template>

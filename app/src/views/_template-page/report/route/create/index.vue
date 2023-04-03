<script lang="ts" setup>
import PageOver from '_c/PageOver/index.vue'
import { SkAppCard } from '@skzz-platform/components/app-card'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { cuRole } from '@skzz-platform/api/system/role'
import { ref } from 'vue'
import { FirstParameter, setData } from '@vunk/core'
import { useRouterTo } from '@skzz-platform/composables'
defineProps({
  uid: {
    type: String,
    default: '',
  },
})
const { routerBack } = useRouterTo()
const formData = ref({} as FirstParameter<typeof cuRole>)

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


function c () {
  cuRole(formData.value).then(() => {
    routerBack({
      path: 'create',
    }, {
      addQueryU: true,
    })
  })
}

</script>
<template>
  <PageOver>
    <SkAppCard :header="'新增角色'" class="h-full">
      <template #header__options>
        <ElButton type="primary"
          @click="c"
        >提交</ElButton>
      </template>
      <div class="gap-form-x"> 
        <SkAppForm
          :layout="true"
          :labelPosition="'top'"
          :formItems="formItems"
          :data="formData"
          @setData="setData(formData, $event)"
        ></SkAppForm>
      </div>
    </SkAppCard>
  </PageOver>
</template>

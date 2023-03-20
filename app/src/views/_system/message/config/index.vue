<template>
  <PageX>
    <SkAppCard :header="'消息配置'" class="h-100%">
      <VkDuplexCalc class="gap-main-x">
        <template #one>
          <SkAppQueryForm :fixes="2" :data="formData" @setData="setData(formData, $event)" :formItems="queryItems">
            <template #options>
              <ElButton type="primary" @click="$router.push('/system/message/config/add')">新增</ElButton>
            </template>
          </SkAppQueryForm>
        </template>
        <SkAppTables class="h-100%" :data="data" :columns="colSource" :total="100">
        </SkAppTables>
      </VkDuplexCalc>
    </SkAppCard>
  </PageX>
</template>

<script lang="tsx" setup>
import PageX from '_c/PageX/index.vue'
import {
  SkAppCard,
  SkAppTables, __SkAppTables,
  SkAppQueryForm, __SkAppQueryForm,
  SkAppOperations,
} from '@skzz/platform'
import { NormalObject, setData, VkDuplexCalc } from '@vunk/core'
import { ref } from 'vue'
import { FixedDir } from 'element-plus/es/components/table-v2/src/constants'

const queryItems: __SkAppQueryForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'title',
    label: '标题',
    clearable: true,
    class: 'w-200px',
  },
]

const colSource: __SkAppTables.Column[] = [
  {
    key: 'title',
    dataKey: 'title',
    width: 50,
    title: '标题',
    align: 'center',
    flexGrow: 1,
  },
  {
    key: 'tpl',
    dataKey: 'tpl',
    width: 50,
    title: '模板',
    align: 'center',
    flexGrow: 1,
  },
  {
    key: 'clientTemplateId',
    dataKey: 'clientTemplateId',
    width: 50,
    title: '模板id',
    align: 'center',
    flexGrow: 1,
  },
  {
    key: 'client',
    dataKey: 'client',
    width: 50,
    title: '接收端',
    align: 'center',
    flexGrow: 1,
  },
  {
    key: 'founderName',
    dataKey: 'founderName',
    width: 50,
    title: '创建人',
    align: 'center',
    flexGrow: 1,
  },
  {
    key: 'operations',
    title: '操作',
    width: 260,
    flexGrow: 1,
    align: 'center',
    fixed: FixedDir.RIGHT,
    cellRenderer: () => {
      return <SkAppOperations
        modules={['r', 'u', 'd']}

      ></SkAppOperations>
    },
  },
]


const formData = ref({
  type: 'all',
} as NormalObject)

const data = [
  ...Array.from({ length: 100 }).map((_, i) => {
    return {
      name: `cx${i}`,
      id: i,
    }
  }),
]

</script>


<script lang="tsx" setup>
import PageX from '_c/PageX/index.vue'
import { 
  SkAppCard, SkCheckTags,
  SkAppTables, __SkAppTables, 
  SkAppQueryForm, __SkAppQueryForm, 
  SkAppOperations,
  Pagination,
} from '@skzz/platform'
import { NormalObject, setData, VkDuplexCalc } from '@vunk/core'
import { ref } from 'vue'
import { FixedDir } from 'element-plus/es/components/table-v2/src/constants'
import { rRoles } from '@skzz-platform/api/system/role'


const formItems: __SkAppQueryForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '姓名',
  },
  {
    templateType: 'VkfInput',
    prop: 'age',
    label: '年龄',
  },
  {
    templateType: 'VkfSelect',
    prop: 'city',
    label: '城市',
  },
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '姓名',
  },
  {
    templateType: 'VkfInput',
    prop: 'age',
    label: '年龄',
  },
  {
    templateType: 'VkfSelect',
    prop: 'city',
    label: '城市',
  },
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '姓名',
  },
  {
    templateType: 'VkfInput',
    prop: 'age',
    label: '年龄',
  },
  {
    templateType: 'VkfSelect',
    prop: 'city',
    label: '城市',
  },
]
const typeOptions = [
  {
    label: '全部',
    value: 'all',
  },
  {
    label: '已发布',
    value: 'published',
  },
  {
    label: '未发布',
    value: 'unpublished',
  },
]
const colSource: __SkAppTables.Column[] = [
  {
    type: 'index',
    width: 50,
  },
  {
    key: 'name',
    dataKey: 'name',
    width: 100,
    title: '姓名',
  },
  {
    key: 'operations',
    title: '操作',
    width: 260,
    fixed: FixedDir.RIGHT,
    cellRenderer: () => {
      return <SkAppOperations 
        modules={[ 'r', 'u', 'd']}

      ></SkAppOperations>
    },
  },
]


const formData = ref({
  type: 'all',
} as NormalObject)

const pagination = ref<Pagination>({
  pageSize: 10,
  start: 0,
})

const data = [
  ...Array.from({ length: 100 }).map((_, i) => {
    return {
      name: `cx${i}`,
    }
  }),
]

rRoles({}, pagination.value)

</script>
<template>
  <PageX>
    <VkDuplexCalc class="plr-page ptb-main-ptb">
      <template #one>
        <SkAppQueryForm 
          :data="formData" 
          @setData="setData(formData, $event)" 
          :formItems="formItems"
        >
        </SkAppQueryForm>
        <div sk-flex="row-between-center" ptb-page>
          <SkCheckTags v-model="formData.type" :options="typeOptions"></SkCheckTags>
          <ElButton type="primary">新增</ElButton>
        </div>

      </template>

      <SkAppTables 
        
        class="h-100%" 
        :data="data"
        :columns="colSource"
        :total="100"
      >
      </SkAppTables>
    </VkDuplexCalc>
  </PageX>
</template>

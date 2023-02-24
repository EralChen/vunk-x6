<script lang="tsx" setup>
import GoldX from '_c/GoldX/index.vue'
import {
  SkAppCard,
  SkCheckTags,
  SkAppTables, __SkAppTables,
  SkAppQueryForm, __SkAppQueryForm,
  SkAppOperations,
} from '@skzz/platform'
import { NormalObject, setData, VkDuplexCalc } from '@vunk/core'
import { ref } from 'vue'
import { FixedDir } from 'element-plus/es/components/table-v2/src/constants'
// import ViewerVue from './viewer.vue'
import MapView from '_c/MapView/index.vue'

const queryItems: __SkAppQueryForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '姓名',
    clearable: true,
    class: 'w-200px',
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
    }
  }),
]

</script>
<template>
  <page-x>
    <SkAppCard class="h-100%" :header="'地图+表格'">
      <GoldX :type="'ltr'" class="h-100%">
        <template #one>
          <VkDuplexCalc class="flex-1 h-100% plr-page ptb-main-ptb">
            <template #one>
              <SkAppQueryForm :fixes="2" :data="formData" @setData="setData(formData, $event)" :formItems="queryItems">
              </SkAppQueryForm>
              <div sk-flex="row-between-center" ptb-page>
                <SkCheckTags v-model="formData.type" :options="typeOptions"></SkCheckTags>
                <ElButton type="primary">新增</ElButton>
              </div>

            </template>

            <SkAppTables class="h-100%" :data="data" :columns="colSource" :total="100">
            </SkAppTables>
          </VkDuplexCalc>
        </template>


        <div class="flex-1 h-100%">
          <MapView></MapView>
        </div>

      </GoldX>

    </SkAppCard>
  </page-x>
</template>

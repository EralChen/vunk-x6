<template>
  <PageX>
    <SkAppCard :header="'消息数据'" class="h-100%">
      <VkDuplexCalc class="gap-main-x">
        <template #one>
          <SkAppQueryForm :fixes="2" :data="formData" @setData="setData(formData, $event)" :formItems="queryItems">
            <!-- <template #options>
              <ElButton type="primary">新增</ElButton>
            </template> -->
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
import { MessageStatus } from './ctx'

const queryItems: __SkAppQueryForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '接收人',
    clearable: true,
    class: 'w-200px',
  },
]

const colSource: __SkAppTables.Column[] = [
  {
    key: 'tplId',
    dataKey: 'tplId',
    width: 50,
    title: '模板ID',
    align: 'center',
    flexGrow: 1,
  },
  {
    key: 'status',
    dataKey: 'status',
    width: 50,
    title: '状态',
    align: 'center',
    flexGrow: 1,
    cellRenderer: ({rowData}) => {
      const stateMap: Record<MessageStatus, string> = {
        [MessageStatus.UnSend]: '未发送',
        [MessageStatus.Send]: '已发送',
        [MessageStatus.Read]: '已读',
        [MessageStatus.Confirm]: '已确认',
        
      }
      return <span>{stateMap[rowData.status as MessageStatus]}</span>
    },
  },
  {
    key: 'title',
    dataKey: 'title',
    width: 50,
    title: '消息标题',
    align: 'center',
    flexGrow: 1,
  },
  {
    key: 'content',
    dataKey: 'content',
    width: 50,
    title: '消息内容',
    align: 'center',
    flexGrow: 1,
  },
  {
    key: 'receiverName',
    dataKey: 'receiverName',
    width: 50,
    title: '接收人',
    align: 'center',
    flexGrow: 1,
  },
  {
    key: 'sendTime',
    dataKey: 'sendTime',
    width: 50,
    title: '发送时间',
    align: 'center',
    flexGrow: 1,
  },
  {
    key: 'founderName',
    dataKey: 'founderName',
    width: 50,
    title: '创建人姓名',
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


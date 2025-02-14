<script lang="ts">
import type { PortManager } from '@antv/x6/es/model/port'
import type { __VkfInformation } from '@vunk/form'
import type { NodeData } from './types'
import { VkfInformation } from '@vunk/form'
import { VkfInformationTemplatesDefault } from '@vunk/form/components/information-templates-default'
import { VkNodeComponent } from '@vunk-x6/components/node-component'
import { ElCard } from 'element-plus'
import { defineComponent } from 'vue'
import { RegisterEndNodePort } from './const'
import { emits, props } from './ctx'

type FormItem = __VkfInformation.FormItem<keyof NodeData>

const formItems: FormItem[] = [
  {
    templateType: 'VkfInputCollection',
    label: '输出',
    prop: 'output',
    summaryLabel (data) {
      return `${data.name}`
    },
    columns: [
      {
        label: '字段',
        prop: 'name',
        templateType: 'VkfInput',
      },
      {
        prop: 'type',
        templateType: 'VkfSelect',
        label: '类型',
        templateProps: {
          options: [
            {
              label: '字符串',
              value: 'string',
            },
          ],
        },
      },
      {
        prop: 'description',
        templateType: 'VkfInput',
        label: '描述',
      },
    ],
  },
  {
    templateType: 'VkfInput',
    label: '文本模板',
    prop: 'textTemplate',
  },
]

export default defineComponent({
  name: 'VkRegisterEndNode',
  components: {
    VkfInformation,
    VkfInformationTemplatesDefault,
    ElCard,
    VkNodeComponent,
  },
  props,
  emits,
  setup () {
    const ports: PortManager.PortMetadata[] = [
      {
        group: 'left',
        id: RegisterEndNodePort.input,
      },
    ]

    return {
      formItems,
      ports,
    }
  },
})
</script>

<template>
  <VkNodeComponent
    shape="VkRegisterEndNode"
    :auto-size="true"
    :items="ports"
  >
    <template #default="{ data }">
      <ElCard class="vk-register-end-node" shadow="hover">
        <template #header>
          <div class="vk-register-end-node__header">
            <img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-End-v2.jpg" />
            <span>结束</span>
          </div>
        </template>

        <VkfInformation
          :data="data"
          :form-items="formItems"
          @update:data="$emit('update:data', $event)"
        >
          <VkfInformationTemplatesDefault />
        </VkfInformation>
      </ElCard>
    </template>
  </VkNodeComponent>
</template>

<style>
.vk-register-end-node {
  --el-card-padding: 12px;
  --el-card-border-color: var(--el-color-primary-light-5);
}

.vk-register-end-node__header {
  font-size: 1.2em;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.vk-register-end-node__header img {
  width: 1em;
  height: 1em;
  margin-right: 8px;
}

.vk-register-end-node {
  min-width: 300px;
}
</style>

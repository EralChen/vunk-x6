<script lang="ts" setup>
import type { PortManager } from '@antv/x6/es/model/port'
import type { __VkfInformation } from '@vunk/form'
import { VkfInformation } from '@vunk/form'
import { VkfInformationTemplatesDefault } from '@vunk/form/components/information-templates-default'
import { VkNodeComponent } from '@vunk-x6/components/node-component'
import { defaultAttrs } from '@vunk-x6/components/port'
import { ElCard } from 'element-plus'
import { RegisterStartNodePort } from './const'

defineOptions({
  name: 'VkRegisterStartNode',
})

const formItems: __VkfInformation.FormItem[] = [
  {
    templateType: 'VkfInputCollection',
    label: '输入',
    prop: 'input',
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
]

const ports: PortManager.PortMetadata[] = [
  {
    group: 'right',
    id: RegisterStartNodePort.output,
    attrs: {
      circle: {
        ...defaultAttrs.circle,
        magnetRule: 'active',
      },

    },
  },
]
</script>

<template>
  <VkNodeComponent
    shape="VkRegisterStartNode"
    :auto-size="true"
    :items="ports"
  >
    <template #default="{ data }">
      <ElCard class="vk-register-start-node" shadow="hover">
        <template #header>
          <div class="vk-register-start-node__header">
            <img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-Start-v2.jpg" />
            <span>开始</span>
          </div>
        </template>

        <VkfInformation
          :data="data"
          :form-items="formItems"
        >
          <VkfInformationTemplatesDefault />
        </VkfInformation>
      </ElCard>
    </template>
  </VkNodeComponent>
</template>

<style>
.vk-register-start-node {
  --el-card-padding: 12px;
  --el-card-border-color: var(--el-color-primary-light-5);
}

.vk-register-start-node__header {
  font-size: 1.2em;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.vk-register-start-node__header img{
  width: 1em;
  height: 1em;
  margin-right: 8px;
}
.vk-register-start-node{
  min-width: 300px;
}
</style>

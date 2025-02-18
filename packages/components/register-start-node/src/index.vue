<script lang="ts" setup>
import type { PortManager } from '@antv/x6/es/model/port'
import type { __VkfInformation } from '@vunk/form'
import { VkfInformation } from '@vunk/form'
import { VkfInformationTemplatesDefault } from '@vunk/form/components/information-templates-default'
import { VkNodeComponent } from '@vunk-x6/components/node-component'
import { defaultAttrs } from '@vunk-x6/components/port'
import { useGraph } from '@vunk-x6/composables'
import { ElCard } from 'element-plus'
import { RegisterStartNodePort } from './const'
import Drawer from './drawer.vue'
import Title from './title.vue'

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
          <Title />
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

  <Drawer
    shape="VkRegisterStartNode"
  ></Drawer>
</template>

<style>
.vk-register-start-node {
  --el-card-padding: 12px;
  --el-card-border-color: var(--el-color-primary-light-5);
}

.vk-register-start-node{
  min-width: 300px;
}
</style>

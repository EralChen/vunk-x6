<script lang="ts" setup>
import type { __VkfInformation } from '@vunk/form'
import { VkfInformation } from '@vunk/form'
import { VkfInformationTemplatesDefault } from '@vunk/form/components/information-templates-default'
import { VkNodeComponent } from '@vunk-x6/components/node-component'
import { ElCard } from 'element-plus'

defineOptions({
  name: 'VkStartNode',
})

const formItems: __VkfInformation.FormItem[] = [
  {
    templateType: 'VkfInputCollection',
    label: '输入',
    prop: 'input',
    columns: [
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
    ],
  },
]
</script>

<template>
  <VkNodeComponent
    shape="VkStartNode"
    :auto-size="true"
  >
    <template #default="{ data }">
      <ElCard class="vk-start-node" shadow="hover">
        <template #header>
          <div class="vk-start-node__header">
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
.vk-start-node {
  --el-card-padding: 12px;
  --el-card-border-color: var(--el-color-primary-light-5);
}

.vk-start-node__header {
  font-size: 1.2em;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.vk-start-node__header img{
  width: 1em;
  height: 1em;
  margin-right: 8px;
}
.vk-start-node{
  min-width: 300px;
}
</style>

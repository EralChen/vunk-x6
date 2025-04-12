<script lang="ts" setup>
import type { __VkfInformation } from '@vunk/form'
import { VkNodeComponent } from '@vunk-x6/components/node-component'
import { VkNodeDrawer } from '@vunk-x6/components/node-drawer'
import { VkNodeHeader } from '@vunk-x6/components/node-header'
import { ElCard } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'
import { props as dProps } from './ctx'

defineOptions({
  name: 'VkNodeCard',
})
const props = defineProps(dProps)
const nodeData = cloneDeep(props.defaultData)

const drawerVisible = ref(false)
</script>

<template>
  <VkNodeComponent
    :shape="shape"
    :auto-size="true"
    :items="ports"
    :default-instance-data="nodeData"
  >
    <template #default="args">
      <ElCard class="vk-node-card" shadow="hover">
        <template #header>
          <VkNodeHeader
            v-model:title="args.data.label"
            :node="args.node"
          >
            <template #icon>
              <slot name="icon"></slot>
            </template>
          </VkNodeHeader>
        </template>

        <slot v-bind="args"></slot>
      </ElCard>
    </template>
  </VkNodeComponent>

  <VkNodeDrawer
    v-model="drawerVisible"
    class="vk-node-card-drawer"
    :shape="shape"
    :description="description"
  >
    <template #header_icon>
      <slot name="icon"></slot>
    </template>

    <template #default="args">
      <slot name="drawer" v-bind="args"></slot>
    </template>
  </VkNodeDrawer>
</template>

<style>
.vk-node-card {
  --el-card-padding: 12px;
  --el-card-border-color: var(--el-color-primary-light-5);
}

.vk-node-card {
  min-width: 380px;
}

.vk-node-card-drawer  .vk-node-header__title {
  font-size: 1.2em;
}
</style>

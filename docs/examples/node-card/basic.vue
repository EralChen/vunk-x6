<script lang="ts" setup>
import type { PortManager } from '@antv/x6/es/model/port'
import type { __VkNodeCard } from '@vunk-x16/components/node-card'
import { Document } from '@element-plus/icons-vue'
import { VkGraph } from '@vunk-x16/components/graph'
import { VkNode } from '@vunk-x16/components/node'
import { VkNodeCard } from '@vunk-x16/components/node-card'
import { defaultAttrs } from '@vunk-x16/components/port'

// 端口配置
const ports: PortManager.PortMetadata[] = [
  {
    group: 'activeBottom' as __VkNodeCard.DefaultGroup,
    id: 'output',
    attrs: {
      circle: {
        ...defaultAttrs.circle,
        magnetRule: 'active',
      },
    },
  },
]

// 默认数据
const defaultData = {
  label: '基础节点',
}
</script>

<template>
  <div h-400px>
    <VkGraph>
      <!-- 注册节点 -->
      <VkNodeCard
        shape="BasicNode"
        :ports="ports"
        :default-data="defaultData"
        description="这是一个基础节点示例"
      >
        <template #icon>
          <!-- 自定义图标 -->
          <ElIcon>
            <Document></Document>
          </ElIcon>
        </template>

        <template #default="{ data }">
          <!-- 卡片内容 -->
          <div class="node-content">
            <p>节点标题：{{ data.label }}</p>
          </div>
        </template>

        <template #drawer>
          <!-- 抽屉内容 -->
          <div class="drawer-content">
            <h3>节点详情</h3>
            <p>这里可以放置更多的节点信息和配置项</p>
          </div>
        </template>
      </VkNodeCard>

      <VkNode
        shape="BasicNode"
        :x="100"
        :y="100"
      ></VkNode>
    </VkGraph>
  </div>
</template>

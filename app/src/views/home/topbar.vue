<script lang="ts" setup>
import { DocumentCopy } from '@element-plus/icons-vue'
import { VkAvatar } from '@vunk/plus/components/avatar'
import { useGraph } from '@vunk-x6/composables'
import { ElMessage } from 'element-plus'

const graph = useGraph()

// 获取 x6 json
function getGraphJson () {
  const json = graph.toJSON()

  // 将 json 转换为字符串
  const jsonString = JSON.stringify(json, null, 2)

  //  将字符串复制到剪贴板
  navigator.clipboard.writeText(jsonString).then(() => {
    ElMessage({
      message: '已复制到剪贴板',
      type: 'success',
    })
  })

  return json
}
</script>

<template>
  <div
    sk-flex="row-between-center"
    pa-xxs
    class="topbar"
  >
    <div font-bold>
      项目名称
    </div>
    <div>
      <VkAvatar
        class="cursor-pointer"
        :icon="DocumentCopy"
        @click="getGraphJson"
      ></VkAvatar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.topbar {
  // bottom shadow
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

}
</style>

<script lang="ts" setup>
import MonacoEnvironment from '@/components/MonacoEnvironment.vue'
import { DocumentAdd, Share } from '@element-plus/icons-vue'
import { useGraph } from '@vunk-x16/composables'
import { VkAvatar } from '@vunk/plus/components/avatar'
import { VkMonacoEditor } from '@vunk/plus/components/monaco-editor'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import chainJson from './chain.json?raw'

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

/* 导入 x6 json */
const jsonValue = ref(chainJson)
const importJsonDialog = ref(false)
function preImportGraphJson () {
  importJsonDialog.value = true
}
function doImportGraphJson () {
  graph.fromJSON(JSON.parse(jsonValue.value))
}
/* endof 导入 x6 json */
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
        :icon="DocumentAdd"
        @click="preImportGraphJson"
      ></VkAvatar>

      <VkAvatar
        class="cursor-pointer"
        :icon="Share"
        @click="getGraphJson"
      ></VkAvatar>
    </div>

    <ElDialog v-model="importJsonDialog" title="导入 X6 JSON" width="80%">
      <div h-66vh>
        <MonacoEnvironment>
          <VkMonacoEditor
            v-model="jsonValue"
            :default-options="{
              language: 'json',
            }"
          ></VkMonacoEditor>
        </MonacoEnvironment>
      </div>
      <template #footer>
        <ElButton
          type="primary"
          @click="doImportGraphJson"
        >
          确定
        </ElButton>
        <ElButton
          @click="importJsonDialog = false"
        >
          取消
        </ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<style lang="scss" scoped>
.topbar {
  // bottom shadow
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

}
</style>

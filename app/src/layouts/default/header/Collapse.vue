<template>
  <el-icon 
    @click="layoutStore.asideInfo.menuCollapse = !layoutStore.asideInfo.menuCollapse"
    :size="20"
  >
    <component :is="layoutStore.asideInfo.menuCollapse ? Expand : Fold" />
  </el-icon>
</template>
<script setup lang="ts">
import { Fold, Expand } from '@element-plus/icons-vue'
import { useLayoutStore } from '@/stores/layout'
const layoutStore = useLayoutStore()
</script>


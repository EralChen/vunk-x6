<script lang="ts" setup>
import { useSharedDark } from '@/composables'
const isDark = useSharedDark()
</script>
<template>
  <div class="pa-1">
    <el-page-header>

      <template #content>
        <span class="text-large font-600 mr-3"> Title </span>
      </template>

      <template #extra>
      <div sk-flex="row_center" sub:ml-m>
        <ElSwitch v-model="isDark"></ElSwitch>
        <el-avatar
          :size="32"
          class="mr-3"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </div>
    </template>
    </el-page-header>
  </div>
</template>

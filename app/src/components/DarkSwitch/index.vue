<script lang="ts" setup>
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useSharedDark } from '@skzz/platform/composables'
import { ElSwitch } from 'element-plus'

const isDark = useSharedDark()
</script>

<template>
  <ElSwitch
    v-model="isDark"
    :inline-prompt="true"
    :active-icon="Sunny"
    :inactive-icon="Moon"
    inactive-color="#000"
    active-color="var(--el-color-info)"
  ></ElSwitch>
</template>

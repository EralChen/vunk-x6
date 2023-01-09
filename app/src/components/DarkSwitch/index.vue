<script lang="ts" setup>
import { useSharedDark } from '@/composables'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { ElSwitch } from 'element-plus'
const isDark = useSharedDark()
</script>
<template>
  <ElSwitch 
    :inlinePrompt="true"
    v-model="isDark" 
    :activeIcon="Sunny"
    :inactiveIcon="Moon"
    :inactiveColor="'#000'"
    :activeColor="'var(--el-color-info)'"
    
  ></ElSwitch>
</template>

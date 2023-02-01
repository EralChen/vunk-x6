<script lang="ts" setup>
import { useThemeStore } from '@/stores/theme'
import { setData } from '@vunk/core'
import { SkMultipage } from '@skzz-platform/components/multipage'
import { ref } from 'vue'
import BaseVue from './base.vue'

const themeStore = useThemeStore()

const currentPage = ref('base')
const modules = ref([
  { label: '基础色彩', value: 'base' },

])
</script>
<template>
  <div plr-page pb-page class="h-main">
    <SkMultipage  
      class="bg-bg-overlay h-100%" 
      tabXClass="plr-form-pl"
      v-model="currentPage" :modules="modules"
    >
      <template #base>
        <div class="plr-form-pl ptb-form-ptb">
          <BaseVue></BaseVue>
        </div>
    
      </template>
    </SkMultipage>
  

  </div>

</template>

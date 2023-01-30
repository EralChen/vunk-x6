<script lang="ts" setup>
import { SkMultipage } from '@skzz-platform/components/multipage'
import { ref } from 'vue'
const currentPage = ref('base')
const modules = ref([
  { label: '基础间距', value: 'base' },
  { label: '命名间距', value: 'name' },
])
</script>
<template>
  <div plr-page>


  <SkMultipage 
    v-model="currentPage" 
    :modules="modules"
    bg-bg-overlay
    class="pl-form-pl"
  >
  
  </SkMultipage>
</div>
</template>

<script lang="ts" setup>
import { ElDropdown, ElSlider } from 'element-plus'
import { useLayoutStore } from '@/stores/layout'
const layoutStore = useLayoutStore()
// const currentSize = ref(14)
</script>
<template>
  <ElDropdown :trigger="'click'">
    <SvgIcon :iconClass="'size'" class="cursor-pointer text-white"></SvgIcon>
    <template #dropdown>
      <div w-200px pa-page>
        <ElSlider :size="'small'" 
        v-model="layoutStore.fontSize" 
        :min="12" :max="18"></ElSlider>
      </div>
   
    </template>
  </ElDropdown>
  
</template>
<style>

</style>
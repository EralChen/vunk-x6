<script lang="ts" setup>
import { ElDropdown, ElSlider } from 'element-plus'
import { useLayoutStore } from '@/stores/layout'
const layoutStore = useLayoutStore()
// const currentSize = ref(14)
</script>
<template>
  <ElDropdown :trigger="'click'">
    <SvgIcon
      :icon-class="'size'"
      class="cursor-pointer text-white"
    />
    <template #dropdown>
      <div
        w-200px
        pa-page
      >
        <ElSlider
          v-model="layoutStore.fontSize" 
          :size="'small'" 
          :min="12"
          :max="18"
        />
      </div>
    </template>
  </ElDropdown>
</template>
<style>

</style>
<script lang="ts" setup>
import DarkSwitch from '_c/DarkSwitch/index.vue'
import { defineAsyncComponent } from 'vue'
import { useThemeStore } from '@skzz-platform/stores/theme'
const LayoutTopMenu = defineAsyncComponent(() => import('_c/LayoutTopMenu/index.vue'))
const { layoutTopClassName } = useThemeStore()

</script>
<template>

    <div sk-flex="row-between-center" class="layout-top text-white"
      :class="{
        [layoutTopClassName]: true
      }"
    >
      <div sk-flex="row_center">
        <div class="layout-top-title f-xxxl font-600 plr-l ptb-s">
          智子开发平台
        </div>
        <LayoutTopMenu></LayoutTopMenu>
      </div>
      
      
      <DarkSwitch></DarkSwitch>
    </div>


</template>
<style>
.layout-top{
  background: var(--layout-top-bg, var(--el-color-primary));
}
.layout-top-title{
  width: var(--layout-aside-width);
}
</style>
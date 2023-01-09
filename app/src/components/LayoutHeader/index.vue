<script lang="ts" setup>
import DarkSwitch from '_c/DarkSwitch/index.vue'
import { ElMenu } from 'element-plus'
import { VkRoutesMenuContent } from '@vunk/skzz/components/routes-menu-content'
import LayoutHeaderNav from '_c/LayoutHeaderNav/index.vue'
</script>
<template>
  <div class="bg-primary text-white" sk-flex="row-between-center">
    <div sk-flex="row_center">
      <div class="layout-header-title f-xxxl font-600 plr-l ptb-s">
        智子开发平台
      </div>
      <LayoutHeaderNav></LayoutHeaderNav>
    </div>
    
    
    <DarkSwitch></DarkSwitch>
  </div>
</template>
<style>
.layout-header-title{
  width: var(--layout-aside-width);
}
</style>
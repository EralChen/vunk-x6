<script lang="ts" setup>
import AsideVue from './aside/index.vue'
import HeaderVue from './header/index.vue'
import { VkDuplexCalc } from '@vunk/core'
</script>
<template>
  <div sk-flex class="layout-default">
    <div class="layout-default-aside-x">
      <AsideVue></AsideVue>
    </div>

    <VkDuplexCalc class="layout-default-main">
      <template #one>
        <HeaderVue></HeaderVue>
      </template>
      
      <RouterView></RouterView>
    </VkDuplexCalc>
  
  </div>
</template>
<style>
.layout-default {
  height: 100%;
}
.layout-default-aside-x{
  height: 100%;
}
.layout-default-main{
  width: 100%;
}
</style>
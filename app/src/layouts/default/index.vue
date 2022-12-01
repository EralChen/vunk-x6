<script lang="ts" setup>
import { defineComponent } from 'vue'
import AsideVue from './aside/index.vue'
</script>
<template>
  <div sk-flex class="layout-default">
    <div class="layout-default-aside-x">
      <AsideVue></AsideVue>
    </div>

    <div>
      <RouterView></RouterView>
    </div>
  
  </div>
</template>
<style>
.layout-default {
  height: 100%;
  width: 100%;
}
.layout-default-aside-x{
  height: 100%;
}
</style>
<script lang="ts" setup>
import { SkMultipage } from '@skzz-platform/components/multipage'
import { ref } from 'vue'
import BaseVue from './base/index.vue'
import NameVue from './name/index.vue'
const currentPage = ref('base')
const modules = ref([
  { label: '基础间距', value: 'base' },
  { label: '命名间距', value: 'name' },
])
</script>
<template>
  <div plr-page pb-page class="h-main">
    <SkMultipage 
      v-model="currentPage" 
      :modules="modules"
      bg-bg-overlay
      class="h-100%"
      tabXClass="pl-form-pl"
    >
      <template #base>
        <div class="ptb-form-ptb plr-form-pl">
          <BaseVue></BaseVue>
        </div>
      </template>
      <template #name>
        <div class="ptb-form-ptb plr-form-pl">
          <NameVue></NameVue>
        </div>
      </template>

    </SkMultipage>
  </div>
</template>
<style>

</style>

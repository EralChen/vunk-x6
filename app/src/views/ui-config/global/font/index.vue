<script lang="ts" setup>
import { SkMultipage } from '@skzz-platform/components/multipage'
import { ref } from 'vue'
import BaseVue from './base/index.vue'

const currentPage = ref('base')
const modules = ref([
  { label: '基础字号', value: 'base' },
])

</script>
<template>
<div plr-page pb-page class="h-main">
  <SkMultipage class="bg-bg-overlay h-100%" :tabXClass="'plr-form-pl'" v-model="currentPage" :modules="modules">
    <template #base>
      <div class="plr-form-pl-plain">
        <BaseVue />
      </div>
    </template>
  </SkMultipage>
</div>
</template>


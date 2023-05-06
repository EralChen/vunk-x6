<script lang="ts" setup>
import { SkMultipageRenderer } from '@skzz-template/components/multipage-renderer'
import { SkMultipageTemplate } from '@skzz-template/components/multipage-template'
import { ref } from 'vue'
const currentPage = ref('tab1')
const name = ref('tab1')
</script>
<template>
  <SkMultipageRenderer v-model="currentPage">
    <SkMultipageTemplate :label="'选项一'" :value="'tab1'">
      <div>{{ name }}</div>
      <template #options>
        <ElButton @click="name = 'cxxx'">change_name</ElButton>
      </template>
    </SkMultipageTemplate>
    
    <SkMultipageTemplate :label="'选项二'" :value="'tab2'">
      <div>123456111222</div>
    </SkMultipageTemplate>
  </SkMultipageRenderer>
</template>
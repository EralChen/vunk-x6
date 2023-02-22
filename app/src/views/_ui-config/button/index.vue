<script lang="ts" setup>
import { SkAppCard } from '@skzz/platform'
import { SkMultipageRenderer } from '@skzz-platform/components/multipage-renderer'
import { SkMultipageTemplate } from '@skzz-platform/components/multipage-template'
import { ref } from 'vue'
import PrimaryVue from './primary.vue'
const currentPage = ref('primary')
</script>
<template>
  <page-x>
    <SkAppCard class="h-100%" :header="'按钮配置'">
      <SkMultipageRenderer v-model="currentPage"
        :headerClass="'plr-form-pl'"
      >
        <SkMultipageTemplate 
          :label="'primary'"
          :value="'primary'"
        >
          
          <PrimaryVue></PrimaryVue>
          
        </SkMultipageTemplate>
      </SkMultipageRenderer>
    </SkAppCard>
  </page-x>
</template>

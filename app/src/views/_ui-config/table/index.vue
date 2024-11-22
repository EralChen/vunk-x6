<script lang="ts" setup>
import { useThemeStore } from '@/stores/theme'
import { SkAppCard, SkAppModule } from '@skzz/platform'
import { setData } from '@vunk/core'

import BasicVue from './basic.vue'
import ConfigVue from './config.vue'

const themeStore = useThemeStore()
</script>

<template>
  <page-x>
    <SkAppCard
      class="h-100%"
      header="表格配置"
    >
      <ElScrollbar>
        <SkAppModule title="配置表单">
          <ConfigVue
            :data="themeStore.tableV2Styles"
            @set-data="setData(themeStore.tableV2Styles, $event)"
          ></ConfigVue>
        </SkAppModule>
        <SkAppModule title="配置用例">
          <BasicVue></BasicVue>
        </SkAppModule>
      </ElScrollbar>
    </SkAppCard>
  </page-x>
</template>

<script lang="ts" setup>
import BaseVue from './base.vue'
import BgVue from './bg.vue'
import TextVue from './text.vue'
import FillVue from './fill.vue'
import BorderVue from './border.vue'
import { SkAppCard } from '@skzz-platform/components/app-card'
import { useThemeStore } from '@/stores/theme'
import { setData, SetDataEvent } from '@vunk/core'

const themeStore = useThemeStore()

const formVueProps = {
  labelWidth: 150,
  formItemBasis: '250px',
  data: themeStore.colorStyles,
  setData: (event: SetDataEvent) => {
    setData(themeStore.colorStyles, event)
  },
}

</script>
<template>
  <div plr-page pb-page class="h-main">
    <div class="bg-bg-overlay h-100%">
      <ElScrollbar>
        <SkAppCard :title="'基础颜色'">
          <BaseVue v-bind="formVueProps" />
        </SkAppCard>


        <SkAppCard :title="'背景颜色'">
          <BgVue v-bind="formVueProps"></BgVue>
        </SkAppCard>

        <SkAppCard :title="'文本颜色'">
          <TextVue v-bind="formVueProps"
          ></TextVue>
        </SkAppCard>

        <SkAppCard :title="'填充颜色'">
          <FillVue v-bind="formVueProps"></FillVue>
        </SkAppCard>

        <SkAppCard :title="'边框颜色'">
          <BorderVue v-bind="formVueProps"></BorderVue>
        </SkAppCard>

      </ElScrollbar>


    </div>

  </div>

</template>

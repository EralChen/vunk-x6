<script lang="ts" setup>
import TextVue from './text.vue'
import BorderVue from './border.vue'
import FillVue from './fill.vue'
import BgVue from './bg.vue'
</script>
<template>
  <TextVue v-bind="$attrs"></TextVue>
  <BorderVue v-bind="$attrs"></BorderVue>
  <FillVue v-bind="$attrs"></FillVue>
  <BgVue v-bind="$attrs"></BgVue>
</template>

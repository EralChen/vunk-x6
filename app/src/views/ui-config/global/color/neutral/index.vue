<script lang="ts" setup>
import TextVue from './text.vue'
import BorderVue from './border.vue'
</script>
<template>
  <TextVue v-bind="$attrs"></TextVue>
  <BorderVue v-bind="$attrs"></BorderVue>
</template>

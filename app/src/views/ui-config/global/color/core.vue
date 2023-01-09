<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<script lang="ts" setup>
import BaseVue from './base.vue'
import NeutralVue from './neutral/index.vue'
</script>
<template>
  <div sub-mt-xl>
    <BaseVue v-bind="$attrs"></BaseVue>
    <NeutralVue v-bind="$attrs"></NeutralVue>
  </div>

</template>

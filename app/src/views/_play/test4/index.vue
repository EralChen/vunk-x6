<script lang="ts" setup>
import { ref } from 'vue'
const flag = ref(false)

</script>
<template>
  <ElButton @click="flag = !flag">
    !flag
  </ElButton>
  <div
    v-show="flag"
    :style="{
      display: 'flex',
    }"
  >
    11111
  </div>
</template>

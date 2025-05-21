<script lang="ts" setup>
import { ref } from 'vue'

const data = ref('memory')
</script>

<template>
  <div pos-absolute inset-0 z-10>
    <div w-full h-full bg-fill-base>
      {{ data }}
    </div>
  </div>
</template>

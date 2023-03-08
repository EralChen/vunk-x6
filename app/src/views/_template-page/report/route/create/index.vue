<script lang="ts" setup>
import { ref } from 'vue'
import PageOver from '_c/PageOver/index.vue'
const data = ref('')
</script>
<template>
  <PageOver>
    <div>{{ data }}</div>
  </PageOver>
</template>

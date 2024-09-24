<script lang="ts" setup>
import { useData } from 'vike-vue/useData'
import type { Data } from './+data'
import { computed } from 'vue'
const data = useData<Data>()
const name = computed(() => data.name)
</script>
<template>
  <div>{{ name }}</div>
</template>

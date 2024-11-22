<script lang="ts" setup>
import type { Data } from './+data'
import { useData } from 'vike-vue/useData'
import { computed } from 'vue'

const data = useData<Data>()
const name = computed(() => data.name)
</script>

<template>
  <div>{{ name }}</div>
</template>

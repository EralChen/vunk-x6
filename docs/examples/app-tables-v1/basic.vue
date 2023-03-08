<script lang="ts" setup>
import { SkAppTablesV1, __SkAppTablesV1 } from '@skzz-platform/components/app-tables-v1'
const data = [
  ...Array.from({ length: 100 }).map((_, i) => {
    return {
      name: `name-${i}`,
    }
  }),
]
const columns: __SkAppTablesV1.Column[] = [
  {
    prop: 'name',
    label: '姓名',
  },
]
</script>
<template>
  <SkAppTablesV1
    :height="'500px'"
    :columns="columns"
    :data="data"
  ></SkAppTablesV1>
</template>
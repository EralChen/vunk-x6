<template>
  <h1>My Vike app</h1>
  This page is: {{ helloWorld }}
  <ul>
    <li>Rendered to HTML.</li>
    <li>Interactive. <Counter /></li>
  </ul>
</template>

<script lang="ts" setup>
import Counter from '#/components/Counter.vue'
import { useData } from 'vike-vue/useData'
import type { Data } from './+data'
const helloWorld = useData<Data>()

</script>

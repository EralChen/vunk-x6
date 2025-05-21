<script lang="ts" setup>
import type { User } from '@vunk-x16/api/user'
import { SkUserSelectTables } from '@vunk-x16/components/user-select-tables'
import { ref } from 'vue'

const currentUsers = ref<User[]>([])
</script>

<template>
  <p>currentUsers: {{ currentUsers }}</p>
  <SkUserSelectTables
    v-model="currentUsers"
  ></SkUserSelectTables>
</template>

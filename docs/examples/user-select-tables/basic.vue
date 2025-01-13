<script lang="ts" setup>
import { SkUserSelectTables } from '@vunk-x6/components/user-select-tables'
import { ref } from 'vue'
import { User } from '@vunk-x6/api/user'

const currentUsers = ref<User[]>([])
</script>
<template>
  <p>currentUsers: {{ currentUsers }}</p>
  <SkUserSelectTables
    v-model="currentUsers"
  ></SkUserSelectTables>
</template>
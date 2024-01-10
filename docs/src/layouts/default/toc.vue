<script lang="ts" setup>
import VPDocAsideOutline from '#/vitepress/components/VPDocAsideOutline.vue'
import { MenuItem, getHeaders } from '#/vitepress/composables/outline'
import { shallowRef, onMounted } from 'vue'
import { onContentUpdated } from '#r/page'
const headers = shallowRef<MenuItem[]>([])



onMounted(() => {
  headers.value = getHeaders(2)
})
onContentUpdated(() => {
  headers.value = getHeaders(2)
})




</script>
<template>
  <VPDocAsideOutline
    :headers="headers"
  ></VPDocAsideOutline>
</template>

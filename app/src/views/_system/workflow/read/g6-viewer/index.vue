<script lang="ts" setup>

import { NormalObject } from '@vunk/core'
import { ZzGraph } from '@zzg6/flow/components/graph'
import { ZzGrid } from '@zzg6/flow/components/grid'
import { ZzRender } from '@zzg6/flow/components/render'
import { PropType } from 'vue'
import '@zzg6/flow/index.css'
defineProps({
  data: { 
    type: Object as PropType<any>,
    default: () => ({}),
  },
})
</script>
<template>
  <ZzGraph>
    <ZzGrid></ZzGrid>
    <ZzRender v-if="data.nodes?.length" :data="data"></ZzRender>
  </ZzGraph>
</template>

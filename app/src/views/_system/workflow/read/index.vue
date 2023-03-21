<script lang="ts" setup>
import { ref, watch } from 'vue'
import { rWorkflow, Workflow } from '@skzz-platform/api/system/workflow'
import { SkAppCard } from '@skzz/platform'
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const data = ref({} as Workflow)
watch(() => props.id, r, { immediate: true })

function r () {
  rWorkflow(props.id).then((res) => {
    data.value = res
  })
}
</script>
<template>
  <PageOver>
    <SkAppCard :header="data.name"
      class="h-full"
    >

    </SkAppCard>
  </PageOver>
</template>

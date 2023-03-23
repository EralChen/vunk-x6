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
    <SkAppCard :header="data.name" class="h-full">
      <ElScrollbar>
        <div gap-main-x sub:mt-page>
          <el-descriptions v-for="(item, index) of data.nodes" :key="index" :title="item['data-id']" border>
            <el-descriptions-item v-for="(v, k) of item" :key="k" :label="k + ''">{{ v }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </ElScrollbar>
    </SkAppCard>
  </PageOver>
</template>

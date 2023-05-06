<script lang="ts" setup>
import { SkCheckTags, __SkCheckTags } from '@skzz-template/components/check-tags'
import { ref } from 'vue'
const options: __SkCheckTags.Option[] = [
  {
    label: '选项1',
    value: '1',
  },
  {
    label: '选项2',
    value: '2',
  },
  {
    label: '选项3',
    value: '3',
  },
]
const checked = ref<string[]>([])
</script>
<template>
  <div>
    <SkCheckTags
      v-model="checked" 
     :options="options"
     ></SkCheckTags>

  </div>
</template>
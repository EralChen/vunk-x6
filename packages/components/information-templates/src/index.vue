<script lang="ts">
import { VkfInformationTemplatesDefault } from '@vunk/form/components/information-templates-default'
import { defineComponent } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkInformationTemplates',
  components: {
    VkfInformationTemplatesDefault,
  },
  props,
  emits,
})
</script>

<template>
  <VkfInformationTemplatesDefault />
</template>

<style>
.vk-information-collection-value {
  width: 250px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
}
.vkf-information-tag__tag + .vkf-information-tag__tag {
  margin-left: 0;
}
</style>

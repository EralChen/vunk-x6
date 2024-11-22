<script lang="ts">
import { rTestData } from '@/api/test'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const testName = ref('')
    rTestData().then((res) => {
      testName.value = res.name
    })

    return {
      testName,
    }
  },
})
</script>

<template>
  <div class="bg-test">
    {{ testName }}
  </div>
</template>

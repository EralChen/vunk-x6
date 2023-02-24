<script lang="ts">
import { defineComponent } from 'vue'
import { GoldX, _GoldXCtx } from '_c/GoldX'
import {  } from '_c/MapView/index.vue'
export default defineComponent({
  props: {
    ..._GoldXCtx.props,
  },
  components: {
    GoldX,
  },
  setup (props) {
    const goldProps = _GoldXCtx.createBindProps(props)
    return {
      goldProps,
    }
  },
})
</script>
<template>
  <GoldX v-bind="goldProps">
    <template #one>

    </template>
    <template #two>

    </template>
  </GoldX>
</template>

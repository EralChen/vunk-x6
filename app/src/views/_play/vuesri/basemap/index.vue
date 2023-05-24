<script lang="ts">
export default {
  name: 'VuesriBasemap',
}
</script>
<script lang="ts" setup>
import { VaSceneView, VaTdtBasemap } from '@vuesri/core'

</script>
<template>
  <page-x>
    <VaSceneView>
      <VaTdtBasemap
        :type="'vec_w'"
        :spatial-reference="{
          wkid: 3857
        }"
      ></VaTdtBasemap>
    </VaSceneView>
  </page-x>
</template>

<script lang="ts" setup>
import { VaSceneView, VaTdtBasemap } from '@vuesri/core'

</script>
<template>
  <VaSceneView>
    <VaTdtBasemap
      :type="'vec_w'"
      :spatialReference="{
        wkid: 3857
      }"
    ></VaTdtBasemap>
  </VaSceneView>
</template>

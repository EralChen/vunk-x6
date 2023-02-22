<script lang="ts" setup>
import { VaSceneView, VaTdtBasemap } from '@vuesri/core'

</script>
<template>
  <page-x>
    <VaSceneView>
      <VaTdtBasemap
        :type="'vec_w'"
        :spatialReference="{
          wkid: 3857
        }"
      ></VaTdtBasemap>
    </VaSceneView>
  </page-x>
</template>

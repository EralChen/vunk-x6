<script lang="ts" setup>
import { VaSceneView } from '@vuesri/core/components/scene-view'
import { VaTdtBasemap } from '@vuesri/core/components/tdt-basemap'
import { VaWmsLayer, __VaWmsLayer } from '@vuesri/core/components/wms-layer'
import { Media, setData } from '@vunk/core'
import { __VkfForm, VkfForm } from '@vunk/form'
import { ref, shallowReactive } from 'vue'
import { rLayers as rLayersApi, geoserver } from './request'
import { VaWmsLayerOnClick } from '@vuesri/core/components/wms-layer-on-click'

const layerLoad: __VaWmsLayer.OnLoad = async (e) => {
  const view = e.view as __esri.SceneView
  await e.layer.when()
  view.goTo(e.layer.fullExtent)
}

/* layerName select */
const layerNameOptions = ref<Media[]>([])
const formItems = ref<__VkfForm.FormItem[]>([
  {
    templateType: 'VkfSelect',
    prop: 'name',
    filterable: true,
    options: layerNameOptions as unknown as Media[],
  },
])
const capabilitiesState = shallowReactive({
  name: 'pub:O3_predict_20220301',
}) 
rLayers()
function rLayers () {
  rLayersApi().then(res => {
    layerNameOptions.value = res.map((v) => {
      return {
        label: v.name,
        value: v.name,
      }
    })
  })
}
/* layerName select end */


/* layer click */
function layerClick () {
  console.log('layerClick')
}

</script>
<template>
<VaSceneView>
  <template #before>
    <VkfForm 
      :formItems="formItems"
      :data="capabilitiesState"
      @setData="setData(capabilitiesState, $event)"
    ></VkfForm>
  </template>

  <VaTdtBasemap 
    :type="'vec_c'"
    :anno="false" 
    :spatial-reference="{
      wkid: 4490
    }"
  ></VaTdtBasemap>

  <VaWmsLayer
    :url="geoserver + '/ows'"
    @load="layerLoad"
    :sublayers="[
      {
        name: capabilitiesState.name,
        queryable: true,
      }
    ]"
  >
      <VaWmsLayerOnClick
        @click="layerClick"
      >
      </VaWmsLayerOnClick>
  </VaWmsLayer>

</VaSceneView>
</template>
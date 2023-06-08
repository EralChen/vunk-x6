<script lang="ts" setup>
import { VaSceneView } from '@vuesri/core/components/scene-view'
import { VaTdtBasemap } from '@vuesri/core/components/tdt-basemap'
import { VaSceneLayer, __VaSceneLayer } from '@vuesri/core/components/scene-layer'
import { VaSlice } from '@vuesri/core/components/slice'
import { FormItemRendererSource, VkfForm } from '@vunk/form'
import { reactive } from 'vue'
import { setData } from '@vunk/core'
import UndergroundVue from './underground.vue'

const url = 'http://116.63.63.191/geoscene/rest/services/XZ/dk_sw3857/SceneServer'

const viewModel = reactive({
  tiltEnabled: false,
})

const formItems: FormItemRendererSource[] = [
  {
    templateType: 'VkfSwitch',
    prop: 'tiltEnabled',
    label: '倾斜启用',
  },
]

const layerLoad:__VaSceneLayer.OnLoad = async ({
  view, layer,
}) => {
  await layer.when()
  view.goTo(layer.fullExtent)
}
</script>
<template>
  <VaSceneView
    :default-options="{
      zoom: 2,
    }"
  >
    <template #before>
      <VkfForm
        :form-items="formItems"
        :data="viewModel"
        @setData="setData(viewModel, $event)"
      ></VkfForm>
    </template>

    <VaTdtBasemap 
      :type="'vec_w'"
      :anno="false" 
  
      :spatial-reference="{
        wkid: 3857
      }"
    >
      <UndergroundVue></UndergroundVue>
    </VaTdtBasemap>

    <VaSceneLayer
      :url="url"
      @load="layerLoad"
    ></VaSceneLayer>
    <VaSlice 
      :position="'top-right'"
      :view-model="viewModel"
    ></VaSlice>
  </VaSceneView>
</template>

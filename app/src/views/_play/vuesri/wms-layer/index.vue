<script lang="ts" setup>
import { VaSceneView } from '@vuesri/core/components/scene-view'
import { VaTdtBasemap } from '@vuesri/core/components/tdt-basemap'
import { VaWmsLayer, __VaWmsLayer } from '@vuesri/core/components/wms-layer'
import { Media, setData } from '@vunk/core'
import { __VkfForm, VkfForm } from '@vunk/form'
import { onMounted, ref, shallowReactive } from 'vue'
import { rLayers as rLayersApi, geoserver } from './request'
import { VaWmsLayerOnClick } from '@vuesri/core/components/wms-layer-on-click'
import { VaTreeLayerGroup, VaTreeLayerItem, VaViewUi, __VaTreeLayerGroup } from '@vuesri/core'
import { VkCheckboxTree } from '@vunk/skzz/components/checkbox-tree'


interface WmsLayerNode extends __VaTreeLayerGroup.TreeNode {
  id: string
  label: string
  layer: {
    type: string,
    if?: boolean,
    visible?: boolean

    url: string,
    name: string
  }
  children?: WmsLayerNode[]
}


/* layerName select */
const layersData = ref<WmsLayerNode[]>([])
const layerChecked = ref<WmsLayerNode[]>([])
const filterText = ref<string>()


rLayers().then(() => {
  filterText.value = 'o'
})
function rLayers () {
  return rLayersApi().then(res => {
    layersData.value = res.map((v) => {
      return {
        id: v.name,
        label: v.name,
        layer: {
          type: 'VaWmsLayer',
          url: geoserver + '/ows',
          name: v.name,
        },
      }
    })
  })
}
/* layerName select end */


/* layer click */

const checkChange = (data: WmsLayerNode, checked: boolean) => {
  console.log(data, checked)
  if (data.layer) {
    data.layer.if = true
    data.layer.visible = checked
  }
  
}

const layerLoad: __VaWmsLayer.OnLoad = async (e) => {
  const view = e.view as __esri.SceneView
  await e.layer.when()
  view.goTo(e.layer.fullExtent)
}

</script>
<template>
<PageX>
  <VaSceneView>
    <VaTdtBasemap 
      :type="'vec_c'"
      :anno="false" 
      :spatial-reference="{
        wkid: 4490
      }"
    ></VaTdtBasemap>

    <VaViewUi class="h-100% bg-bg-overlay">
      <VkCheckboxTree 
        class="pa-m"
        :modules="['srcollbar', 'filter']"
        v-model:filterText="filterText"
        v-model="layerChecked"
        :data="layersData" 
       @check-change="checkChange" 
       :render-after-expand="false"
      ></VkCheckboxTree>
    </VaViewUi>

    <VaTreeLayerGroup :data="layersData">
      <VaTreeLayerItem type="VaWmsLayer">
        <template #default="{ layer }">
          <VaWmsLayer 
            v-if="layer.if"
            :url="layer.url" 
            :visible="layer.visible"
            :sublayers="[
              {
                name: layer.name,
                queryable: true,
                popupEnabled: true,
              }
            ]"
            @load="layerLoad"
          >
            <VaWmsLayerOnClick></VaWmsLayerOnClick>
          </VaWmsLayer>
        </template>
      </VaTreeLayerItem>
    </VaTreeLayerGroup>



    <!-- <VaWmsLayer
      :url="geoserver + '/ows'"
      @load="layerLoad"
      :sublayers="[
        {
          name: 'pub:O3_predict_20220301',
          queryable: true,
        }
      ]"
    >
    </VaWmsLayer> -->

  </VaSceneView>
</PageX>
</template>

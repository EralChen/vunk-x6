<script lang="ts" setup>
import {  ref } from 'vue'
import { rLayers as rLayersApi, geoserver } from './request'
import { VkCheckboxTree } from '@vunk/skzz/components/checkbox-tree'
import { VaPopupTemplate, VaSceneView, VaTdtBasemap, VaWmsLayer, __VaWmsLayer, VaTreeLayerGroup, VaTreeLayerItem, VaViewUi, __VaTreeLayerGroup } from '@vuesri/core'
import { VaWmsLayerPopupTemplate } from '@vuesri/core/components/wms-layer-popup-template'


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

rLayers()
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
      />

      <VaViewUi class="h-100% bg-bg-overlay">
        <VkCheckboxTree 
          v-model:filterText="filterText"
          v-model="layerChecked"
          class="pa-m"
          :modules="['srcollbar', 'filter']"
          :data="layersData" 
          :render-after-expand="false" 
          @check-change="checkChange"
        />
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
              <VaPopupTemplate :orphan="true">
                <template #plugins>
                  <VaWmsLayerPopupTemplate />
                </template>
              
                <template #default="{attributes}">
                  <el-descriptions :border="true">
                    <el-descriptions-item
                      v-for="(v, k) of attributes"
                      :key="k"
                      :label="k + ''"
                    >
                      {{ v }}
                    </el-descriptions-item>
                  </el-descriptions>
                </template>
              </VaPopupTemplate>
            </VaWmsLayer>
          </template>
        </VaTreeLayerItem>
      </VaTreeLayerGroup>
    </VaSceneView>
  </PageX>
</template>

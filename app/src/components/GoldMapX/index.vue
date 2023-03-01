<script lang="ts">
import MapView from 'esri/views/MapView'
import SceneView from 'esri/views/SceneView'
import { defineComponent, PropType, provide, ref } from 'vue'
import { GoldX, _GoldXCtx } from '_c/GoldX'
import { Viewer } from '_c/Viewer'
export default defineComponent({
  props: {
    ..._GoldXCtx.props,
    viewer: {
      type: Object as PropType<any>,
      default: Viewer,
    },
    viewerIndex: {
      type: Number as PropType<1 | 2>,
      default: 1,
    },
  },
  components: {
    GoldX,
  },
  setup (props) {
    const goldProps = _GoldXCtx.createBindProps(props)
    const ready = ref(false)
    const viewLoad = (e: { view: __esri.View }) => {
      provide('vaView', e.view)
      // 判断 是否是 MapView 实例
      if (e.view instanceof MapView) {
        provide('vaMapView', e.view)
      } 
      if (e.view instanceof SceneView) {
        provide('vaSceneView', e.view)
      }
  
      ready.value = true
    }
    return {
      goldProps,
      viewLoad,
      ready,
    }
  },
})
</script>
<template>
  <GoldX v-bind="goldProps">
    <template #one>
      <div class="h-100% ptb-page pl-page" v-if="viewerIndex === 1">
        <component :is="viewer" 
        @load="viewLoad"
        >
          <slot name="map"></slot>
        </component>
      </div>


      <slot v-else-if="ready"></slot>


    </template>

    <template #two>
      <div class="h-100% ptb-page pr-page"  v-if="viewerIndex === 2">
      <component :is="viewer"
        @load="viewLoad"
      >
        <slot name="map"></slot>
      </component>
      </div>

      <slot v-else-if="ready"></slot>


    </template>
  </GoldX>
</template>

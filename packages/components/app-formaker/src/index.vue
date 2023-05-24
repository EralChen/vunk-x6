<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent, ref } from 'vue'
import { VkfDesigner, _VkfDesignerCtx } from '@vunk/formaker/components/designer'
import { vkRendererTemplateGisConfigGroup } from '@vunk/skzz/components/renderer-template-gis/shared'
import VkRendererTemplateGis from '@vunk/skzz/components/renderer-template-gis'
import { ElCollapseItem } from 'element-plus'
import { VkfDragWrapper } from '@vunk/formaker/components/drag-wrapper'
export default defineComponent({
  name: 'SkAppFormaker',
  components: {
    VkfDesigner,
    ElCollapseItem,
    VkRendererTemplateGis,
    VkfDragWrapper,
  },
  props,
  emits,
  setup (props, { emit }) {
    const designerBindProps = _VkfDesignerCtx.createBindProps(props, ['activeWidget0Item', 'configSource'])
    const designerOnEmits = _VkfDesignerCtx.createOnEmits(emit, ['update:activeWidget0Item'])
    const activeWidget0Item = ref([0, 1, 'geo'])
    const configSource = {
      ...vkRendererTemplateGisConfigGroup,
    }
    return {
      activeWidget0Item,
      designerBindProps,
      designerOnEmits,
      configSource,
    }
  },
})
</script>
<template>
  <VkfDesigner
    v-model:activeWidget0Item="activeWidget0Item"
    :class="'is-t1'"
    :config-source="configSource"
    v-bind="designerBindProps"
    :drag-default-options="{
      'VkfSwitch': {
        label: '开关',
        activeValue: 1,
        inactiveValue: 0,
      },
      'VkfRadio': {
        options: [{
          value: '1',
        },]
      },
      'VkfDatePicker': {
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
      }
    }"
    v-on="designerOnEmits"
  >
    <template #widgetTab0>
      <ElCollapseItem
        :title="'地理相关'"
        :name="'geo'"
      >
        <ul class="vkf-layout-widget-ul">
          <VkfDragWrapper
            :data="JSON.stringify({
              source: {
                templateType: 'VkGeoinput',
                label: 'label',
                prop: ''
              }
            })"
          >
            <li>地理输入框</li>
          </VkfDragWrapper>
        </ul>
      </ElCollapseItem>
    </template>
    <!-- <template #option>
      <div
        sk-flex="row-between-center"
        class="size"
      >
        <AppH2>基础表单设置</AppH2>
        <ElButton
          type="primary"
          @click="$emit('u')"
          v-if="canU"
        >保存</ElButton>
      </div>

    </template> -->
    <template #rendererTemplate>
      <VkRendererTemplateGis
        :data="data"
        @setData="$emit('setData', $event)"
      />
    </template>
  </VkfDesigner>
</template>
<style>
.is-t1.vkf-designer .vkf-designer-option {
  padding-bottom: 1em;
  height: initial;
}

.is-t1.vkf-designer .vkf-designer-option .el-button-group {
  display: none;
}

.is-t1.vkf-designer .vkf-designer-main {
  background: white;
  padding: 2em;
}

.is-t1.vkf-designer .vkf-layout-main-x {
  background: var(--el-bg-color-page);
  padding: 1em 5em 3em;
}

.is-t1.vkf-designer .vkf-layout-widget-x,
.is-t1.vkf-designer .vkf-layout-config-x {
  min-width: 15em;

  padding: 1em 1.5em;
}
</style>

<style>
/* [TODO] 无prop template */
.vkf-layout-widget-x .el-tab-pane .el-collapse .el-collapse-item:nth-child(2) {
  display: none;
}
.vkf-layout-main-card .el-scrollbar__view, .vkf-designer .el-scrollbar__view {
  height: auto;
}
</style>
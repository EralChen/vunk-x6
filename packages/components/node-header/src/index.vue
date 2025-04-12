<script lang="ts">
import type { Node } from '@antv/x6'
import type { ElInput } from 'element-plus'
import type { Ref } from 'vue'
import { Select } from '@element-plus/icons-vue'
import { VkNode } from '@vunk-x6/components/node'
import { useGraph, useGraphEmitter } from '@vunk-x6/composables'
import { computed, defineComponent, nextTick, onBeforeUnmount, ref, shallowReactive } from 'vue'
import ActionMore from './action-more.vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkNodeHeader',
  components: {
    ActionMore,
    VkNode,
  },
  props,
  emits,
  setup (props, { emit }) {
    const graph = useGraph()
    const { graphEmitterOn } = useGraphEmitter()
    const actionsRef = ref() as Ref<HTMLDivElement>

    /* label 修改 */
    const labelEditing = ref(false)
    const labelInputRef = ref<InstanceType<typeof ElInput>>()
    const handleLabelEditing = async () => {
      labelEditing.value = true
      await nextTick()
      labelInputRef.value?.focus()
    }
    const theTitle = computed<string>({
      get () {
        return props.title || props.node.data?.label
      },
      set (value: string) {
        emit('update:title', value)
      },
    })
    const editDone = () => {
      if (!labelEditing.value) {
        return
      }
      const value = theTitle.value.trim()
      emit('update:title', value || '未命名节点')
      labelEditing.value = false
    }
    graph.on('blank:click', editDone)
    onBeforeUnmount(() => {
      graph.off('blank:click', editDone)
    })
    /* endof label修改 */

    /* 删除节点 */
    function handleDelete () {
      if (props.node) {
        graph.removeCell(props.node.id)
      }
    }
    /* endof 删除节点 */

    /* 复制节点 */
    const clonedNodes = shallowReactive([]) as Node[]
    function handleCopy () {
      if (props.node) {
        const nNode = props.node.clone()

        // 左上角偏移
        const { x, y } = nNode.position()
        nNode.position(x + 40, y + 40)
        clonedNodes.push(nNode)
      }
    }
    /* endof 复制节点  */

    /* 阻止 actions 冒泡 */

    graphEmitterOn('node:mouseup', ({ e }) => {
      const path = e.originalEvent.composedPath()
      if (
        path.includes(actionsRef.value)
        || path.includes(labelInputRef.value?.$el)
      ) {
        e.stopPropagation()
      }
    })

    /* endof 阻止 actions 冒泡 */

    return {
      labelEditing,
      Select,
      theTitle,
      labelInputRef,
      handleLabelEditing,
      editDone,
      handleDelete,
      handleCopy,
      clonedNodes,
      actionsRef,
    }
  },
})
</script>

<template>
  <div class="vk-node-header">
    <div class="vk-node-header__top">
      <slot name="title">
        <div class="vk-node-header__title">
          <slot name="icon"></slot>
          <ElInput
            v-if="labelEditing"
            ref="labelInputRef"
            v-model="theTitle"
            @keydown.enter="editDone"
          >
            <template #append>
              <ElButton
                :icon="Select"
                @click="editDone"
              ></ElButton>
            </template>
          </ElInput>
          <span v-else>{{ theTitle }}</span>
        </div>
      </slot>
      <div ref="actionsRef" class="vk-node-header__actions">
        <slot name="actions" />
        <ActionMore
          @edit-pen="handleLabelEditing"
          @delete="handleDelete"
          @copy="handleCopy"
        ></ActionMore>
      </div>
    </div>
    <div
      v-if="$slots.description || description"
      class="vk-node-header__description"
    >
      <slot name="description">
        {{ description }}
      </slot>
    </div>

    <!-- copyed node -->
    <VkNode v-for="node in clonedNodes" :key="node.id" :node="node"></VkNode>
  </div>
</template>

<style>
.vk-node-header {
  margin-bottom: 0;
}

.vk-node-header__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.vk-node-header__title {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.vk-node-header__title > * + * {
  margin-left: 8px;
}

.vk-node-header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.vk-node-header__actions .el-avatar--icon {
  cursor: pointer;
}

.vk-node-header__description {
  margin-top: 8px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
</style>

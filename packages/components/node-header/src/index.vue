<script lang="ts">
import { Select } from '@element-plus/icons-vue'
import { useGraph } from '@vunk-x6/composables'
import { type ElInput, valueEquals } from 'element-plus'
import { computed, defineComponent, nextTick, onBeforeUnmount, ref } from 'vue'
import ActionMore from './action-more.vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkNodeHeader',
  components: {
    ActionMore,

  },
  props,
  emits,
  setup (props, { emit }) {
    const graph = useGraph()

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

    return {
      labelEditing,
      Select,
      theTitle,
      labelInputRef,
      handleLabelEditing,
      editDone,
      handleDelete,
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
      <div class="vk-node-header__actions">
        <slot name="actions" />
        <ActionMore
          @edit-pen="handleLabelEditing"
          @delete="handleDelete"
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

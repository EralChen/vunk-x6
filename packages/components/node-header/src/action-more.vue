<script lang="ts" setup>
import { CopyDocument, Delete, EditPen, More } from '@element-plus/icons-vue'
import VkAvatar from '@vunk/plus/components/avatar'
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElMessageBox } from 'element-plus'

const emit = defineEmits({
  editPen: null,
  delete: null,
  copy: null,
})
/* 删除 需要二次确认 */
function handleDelete () { // 'element-plus' 确认
  ElMessageBox.confirm('是否删除该节点？', '提示', {
    type: 'warning',
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '确定',

  }).then(() => {
    emit('delete')
  })
}
</script>

<template>
  <ElDropdown>
    <VkAvatar :icon="More"></VkAvatar>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem @click="$emit('editPen')">
          <VkAvatar
            :icon="EditPen" size="small"
            color="var(--el-color-primary)"
          ></VkAvatar>
          <span>重命名</span>
        </ElDropdownItem>

        <ElDropdownItem @click="$emit('copy')">
          <VkAvatar
            :icon="CopyDocument" size="small"
          ></VkAvatar>
          <span>复制</span>
        </ElDropdownItem>

        <ElDropdownItem @click="handleDelete">
          <VkAvatar
            :icon="Delete" size="small"
            color="var(--el-color-danger)"
          ></VkAvatar>
          <span>删除</span>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

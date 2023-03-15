<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
export default defineComponent({
  name: 'SkAppOperations',
  components: {
    ElButton,
  },
  emits,
  props,
  setup (props, { emit }) {

    const moduleInfo = {
      c: {
        label: '创建',
        eventName: 'c',
      },
      r: {
        label: '查看',
        eventName: 'r',
      },
      u: {
        label: '编辑',
        eventName: 'u',
      },
      d: {
        label: '删除',
        eventName: 'd',
      },
      increase: {
        label: '创建',
        eventName: 'c',
      },
      modify: {
        label: '编辑',
        eventName: 'u',
      },
      remove: {
        label: '删除',
        eventName: 'd',
      },
      detail: {
        label: '查看',
        eventName: 'r',
      },
    } as Record<string, { label: string, eventName: string }>

    const crud = (key: string) => {
      const e = moduleInfo[key]?.eventName
      if (e) {
        emit('click', e)
        emit(e as any)
      }
    }
    return {
      moduleInfo,
      crud,
    }
  },
})
</script>
<template>
  <div class="sk-app-operations">
    <template v-for="(item) of modules" :key="item">
      <slot :name="item"></slot>
      
      <el-popconfirm 
        v-if="moduleInfo[item]?.eventName === 'd'"
        title="确认删除吗?"
        @confirm="crud(item)"
      >
        <template #reference>
          <el-button :size="'small'" :type="'danger'">
            {{ moduleInfo[item].label }}
          </el-button>
        </template>
      </el-popconfirm>
  
    
      <el-button 
        v-else-if="moduleInfo[item]" 
        :type="'primary'" 
        :size="'small'"
        @click="crud(item)"
      >{{ moduleInfo[item].label }}
      </el-button>
      
    </template>
  </div>
</template>
<style>
.sk-app-operations{
  white-space: nowrap;
}
</style>
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
    const lables = {
      c: '创建',
      r: '查看',
      u: '编辑',
      d: '删除',
    } 
    const crud = (e: string) => {
      emit('click', e)
      emit(e as any)
    }
    return {
      lables,
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
        v-if="item === 'd'"
        title="确认删除吗?"
        @confirm="crud(item)"
      >
        <template #reference>
          <el-button :size="'small'" :type="'danger'">
            {{ lables[item] }}
          </el-button>
        </template>
      </el-popconfirm>
  
    
      <el-button 
        v-else-if="lables[item]" 
        :type="'primary'" 
        :size="'small'"
        @click="crud(item)"
      >{{ lables[item] }}
      </el-button>
      
    </template>
  </div>
</template>

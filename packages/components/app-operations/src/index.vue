<script lang="ts">
import { props, emits } from './ctx'
import { computed, defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'
import { Button } from '@skzz-platform/api/system/button'
export default defineComponent({
  name: 'SkAppOperations',
  components: {
    ElButton,
  },
  emits,
  props,
  setup (props, { emit }) {

    const defaultModuleInfo = {
      c: {
        label: '新增',
        event: 'c',
      },
      r: {
        label: '查看',
        event: 'r',
      },
      u: {
        label: '编辑',
        event: 'u',
      },
      d: {
        label: '删除',
        event: 'd',
      },

      increase: {
        label: '新增',
        event: 'increase',
      },
      modify: {
        label: '编辑',
        event: 'modify',
      },
      remove: {
        label: '删除',
        event: 'remove',
      },
      search: {
        label: '查看',
        event: 'search',
      },

    } as Record<string/* buttonId */, Partial<Button> | null>

    const eventEmits = {
      c: ['c'],
      r: ['r'],
      u: ['u'],
      d: ['d'],

      increase: ['increase','c'],
      modify: ['modify', 'u'],
      remove: ['remove', 'd'],
      search: ['search','r'],
    } as Record<string/* event */,  string[]>

    const remoteModuleInfo = ref<Record<string, Partial<Button>>>({})

    const moduleInfo = computed(() => {
      return {

        ...defaultModuleInfo,
        ...remoteModuleInfo.value,
        ...props.excludes.reduce((a, c) => {
          a[c] = null
          return a
        }, {} as typeof defaultModuleInfo),

      }
    })

    const remoteModules = ref<string[]>([])

    props.api()?.then(res => {
      remoteModules.value = res.map(item => item.buttonId)
      remoteModuleInfo.value = res.reduce((acc, cur) => {
        acc[cur.buttonId] = cur
        return acc
      }, {} as Record<string, Partial<Button>>)
    })

    const crud = (key: string) => {
      const e = moduleInfo.value[key]?.event
      if (e) {
        emit('click', e)
        if (eventEmits[e]) {
          eventEmits[e].forEach(eventName => {
            emit(eventName as any)
          })
        }
      }
    }

    const modules = computed(() => {
      return props.modules?.length ? props.modules : remoteModules.value
    })
    return {
      moduleInfo,
      crud,
      modules,
      eventEmits,
    }
  },
})
</script>
<template>
  <div class="sk-app-operations">
    <template v-for="(item) of modules" :key="item">
      <slot :name="item"></slot>
      
      <el-popconfirm 
        v-if="eventEmits[moduleInfo[item]?.event + '']?.includes('d')
        "
        title="确认删除吗?"
        @confirm="crud(item)"
      >
        <template #reference>
          <el-button :size="'small'" :type="'danger'">
            {{ moduleInfo[item]?.label }}
          </el-button>
        </template>
      </el-popconfirm>
  
    
      <el-button 
        v-else-if="moduleInfo[item]" 
        :type="'primary'" 
        :size="'small'"
        @click="crud(item)"
      >{{ moduleInfo[item]?.label }}
      </el-button>
      
    </template>
  </div>
</template>
<style>
.sk-app-operations{
  white-space: nowrap;
}
</style>
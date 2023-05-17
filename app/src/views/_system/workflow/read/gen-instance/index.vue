<script lang="tsx">
import { PropType, defineComponent, reactive, watch } from 'vue'
import { SkAppTables, __SkAppTables } from '@skzz-platform/components/app-tables'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { Pagination } from '@skzz-platform/shared'
import { VkDuplex, setData } from '@vunk/core'
import { ElCheckbox, ElInput, ElMessage } from 'element-plus'
import BindUser from '../../bind-user/index.vue'
import { NodeConfig } from '@antv/g6'
import { InstanceBindOpers, NodesDeadLine, Workflow, genInstance } from '@skzz-platform/api/system/workflow'
import { cloneDeep } from 'lodash-es'
import { User } from '@skzz-platform/api/system/user'
import { MaterialGeometryEnum } from '@zzg6/flow' 

type Row = NodeConfig & {
  deadLine?: string
}
export default defineComponent({
  name: 'GenInstance',
  emits: {
    'success': () => true,
    'update:modelValue': (v: Partial<Row>[]) => v,
  },
  props: {
    modelValue: {
      type: Array as PropType<Partial<any>[]>,
      default: () => ([]),
    },
    tableData: {
      type: Array as PropType<NodeConfig[]>,
      default: () => ([]),
    },
    flowData: {
      type: Object as PropType<Workflow>,
      default: () => ({}),
    },
    itemId: {
      type: String,
      default: '',
    },
  },
  components: {
    SkAppTables,
    VkDuplex,
    SkAppForm,
  },
  setup (props, { emit }) {
    const queryItems: __SkAppForm.CoreFormItem<any>[] = [
      {
        prop: 'any',
        label: '假表单',
        templateType: 'VkfInput',
      },
    ]
    const queryState = reactive({
      data: {} as Partial<any>,
    })
    let tempTata = [] as Row[]
    const tableState = reactive({
      data: [] as Row[],
      columns: [
        {
          title: '节点名称',
          dataKey: 'label',
          key: 'label',
          width: 200,
        },
        {
          title: '无需办理',
          dataKey: 'isChecked',
          key: 'isChecked',
          width: 200,
          flexGrow: 1,
          cellRenderer: ({ rowData }) => {
            return <>
              <ElCheckbox
                v-model={rowData.isChecked}
              ></ElCheckbox>
            </>
          },
        },
        {
          title: '操作人(必填)',
          dataKey: 'operShow',
          key: 'operShow',
          width: 200,
          flexGrow: 1,
          cellRenderer: ({ rowData }) => {
            return <>
              <BindUser showData={rowData.insOpers} v-model={rowData.operShow} v-model:data={rowData.insOpers} onDoBindUser={() => rowData.operShow = false}></BindUser>
            </>
          },
        },
        {
          title: '办理时长',
          dataKey: 'deadLine',
          key: 'deadLine',
          width: 200,
          flexGrow: 1,
          cellRenderer: ({ rowData }) => {
            return <ElInput type='number' v-model={rowData.deadLine}></ElInput>
          },
        },

      ] as __SkAppTables.Column[],

      pagination: {
        pageSize: 8,
        start: 0,
      } as Pagination,

      total: 0,
    })

    watch(() => props.tableData, v => {
      if (v) {
        tempTata = v.filter(item => {
          if (item.type !== MaterialGeometryEnum.zzStart && item.type !== MaterialGeometryEnum.zzEnd) {
            item.isChecked = false
            return true
          }
        })
        tableState.data = cloneDeep(tempTata)
      }

    }, { deep: true, immediate: true })


    function filterOpers () {
      const skipNodes = tableState.data.filter(item => item.isChecked).map(item => item.id)
      let isOk = false
      const nodeOpers = []
      const nodesDeadLine = [] as NodesDeadLine[]
      for (const item of tableState.data) {
        const ops = (item.insOpers as User[])?.map(inner => ({
          operId: inner.id,
          operName: inner.name,
        })) || []
        if (ops.length) isOk = true
        else isOk = false
        if (ops.length) {
          nodeOpers.push({
            nodeId: item.id,
            opers: ops,
          }) 
        }
        if (item.deadLine)
          nodesDeadLine.push({
            nodeId: item.id,
            deadLine: parseInt(item.deadLine),
          })
      }

      return {
        isOk,
        skipNodes,
        nodeOpers: nodeOpers as InstanceBindOpers[],
        nodesDeadLine,
      }
    }


    function doGen () {
      const { skipNodes, nodeOpers, isOk, nodesDeadLine } = filterOpers()
      if (!isOk) {
        ElMessage.warning('请选择操作人！')
        return
      }
      if (!props.flowData.formTable) {
        ElMessage.warning('需要被操作的表单位置！')
        return
      }
      genInstance({
        itemId: props.itemId,
        skipNodes,
        nodeOpers,
        formData: queryState.data,
        formTable: props.flowData.formTable,
        nodesDeadLine: nodesDeadLine,
      }).then(() => {
        tableState.data = cloneDeep(tempTata)
        queryState.data = {}
        emit('success')
      })
    }
    return {
      queryItems,
      setData,
      queryState,
      tableState,
      doGen,
    }
  },
})
</script>
<template>
  <VkDuplex>
    <template #one>
      <SkAppForm :formItems="queryItems" :data="queryState.data" @setData="setData(queryState.data, $event)">
      </SkAppForm>
    </template>

    <SkAppTables class="h-30em" :columns="tableState.columns" :data="tableState.data" :total="tableState.total"
      v-model:start="tableState.pagination.start" v-model:pageSize="tableState.pagination.pageSize" :layout="''">
    </SkAppTables>
    <div sk-flex="row-end">
      <el-button size="large" type="primary" @click="doGen">确定</el-button>
    </div>
  </VkDuplex>
</template>

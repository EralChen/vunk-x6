<script lang="tsx">
import { PropType, defineComponent, reactive, ref, watch } from 'vue'
import { SkAppTables, __SkAppTables } from '@skzz-platform/components/app-tables'
import { SkAppForm, __SkAppForm } from '@skzz-platform/components/app-form'
import { Pagination } from '@skzz-platform/shared'
import { VkDuplex, setData } from '@vunk/core'
import { ElCheckbox, ElForm, ElInput, ElMessage, FormRules, dayjs } from 'element-plus'
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
  components: {
    SkAppTables,
    VkDuplex,
    SkAppForm,
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
  emits: {
    'success': () => true,
    'update:modelValue': (v: Partial<Row>[]) => v,
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

    const formRules = ref<FormRules>({
      '0.deadLine': {
        required: true,
        message: '最后期限不能为空',
        trigger: 'blur',
      },
    })
    const tableFormRef = ref<InstanceType<typeof ElForm>>()
    
    const oneButton = reactive({
      insOpers: [],
      operShow: false,
    })
    const oneUpdateMan = (e: User[]) => {
      tableState.data.forEach((item) => {
        item.insOpers = e
      })
    }
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
          title: '',
          dataKey: 'operShow',
          key: 'operShow',
          width: 200,
          flexGrow: 1,
          headerCellRenderer: ({}) => {
            return <>
              <span>操作人</span>
              <BindUser showData={oneButton.insOpers} v-model={oneButton.operShow} v-model:data={oneButton.insOpers} onDoBindUser={() =>{
                oneButton.operShow = false 
                oneButton.insOpers = []
              }} onUpdate:data={(e) => oneUpdateMan(e)}></BindUser>
            </>
          },
          cellRenderer: ({ rowData, rowIndex }) => {
            return <el-form-item label=" " prop={`${rowIndex}.insOpers`} >
              <BindUser showData={rowData.insOpers} v-model={rowData.operShow} v-model:data={rowData.insOpers} onDoBindUser={() => rowData.operShow = false}></BindUser>
            </el-form-item>
          },
        },
        {
          title: '最后期限(必填)',
          dataKey: 'deadLine',
          key: 'deadLine',
          width: 200,
          flexGrow: 1,
          cellRenderer: ({ rowData, rowIndex }) => {
            return <el-form-item label=" " prop={`${rowIndex}.deadLine`} >
              <el-date-picker
                v-model={rowData.deadLine}
                type="datetime"
                placeholder="请选择到期时间"
                value-format="YYYY-MM-DD HH:mm:ss"
                format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
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
        tempTata = v.filter((item) => {
          if (item.type !== MaterialGeometryEnum.zzStart && item.type !== MaterialGeometryEnum.zzEnd) {
            item.isChecked = false
            item.deadLine = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
            return true
          }
        })
        tempTata.forEach((item, index) => {
          formRules.value[`${index}.deadLine`] = [
            {
              required: true,
              message: '最后期限不能为空',
              trigger: 'change',
            },
          ]
          formRules.value[`${index}.insOpers`] = [
            {
              required: true,
              message: '操作人不能为空',
              trigger: 'change',
            },
          ]
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
        if (item.deadLine) {
          nodesDeadLine.push({
            nodeId: item.id,
            deadLine: item.deadLine,
          })
        } else {
          isOk = false
        }

      }

      return {
        isOk,
        skipNodes,
        nodeOpers: nodeOpers as InstanceBindOpers[],
        nodesDeadLine,
      }
    }


    async function doGen () {
      const { skipNodes, nodeOpers, isOk, nodesDeadLine } = filterOpers()
      try {
        const valid = tableFormRef.value?.validate()
        if (!valid) return
        if (!isOk) {
          ElMessage.warning('请选择操作人并填写超时时间！')
          return
        }
        if (!props.flowData.formTable) {
          ElMessage.warning('需要被操作的表单未知！')
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
      } catch (error) {

      }
      
    }
    return {
      queryItems,
      setData,
      queryState,
      tableState,
      doGen,
      formRules,
      tableFormRef,
    }
  },
})
</script>
<template>
  <VkDuplex>
    <template #one>
      <SkAppForm
        :form-items="queryItems"
        :data="queryState.data"
        @setData="setData(queryState.data, $event)"
      />
    </template>

    <ElForm
      ref="tableFormRef"
      :model="tableState.data"
      :rules="formRules"
    >
      <SkAppTables
        v-model:start="tableState.pagination.start"
        v-model:pageSize="tableState.pagination.pageSize"
        class="h-30em"
        :columns="tableState.columns"
        :data="tableState.data"
        :total="tableState.total"
        :row-height="70"
        :layout="''"
      />
      <div sk-flex="row-end">
        <el-button
          size="large"
          type="primary"
          @click="doGen"
        >
          确定
        </el-button>
      </div>
    </ElForm>
  </VkDuplex>
</template>
<style scoped>
:deep(.el-form-item) {
  width: 100%;
}
</style>
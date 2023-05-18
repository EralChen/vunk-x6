<script lang="tsx" setup>
import { computed, reactive, watch } from 'vue'
import { cuUser, dUsers, rUsers, rUserBtns, rBoundUsers, cBoundUsers } from '@skzz-platform/api/system/user'
import { SkAppDialog, SkAppOperations, SkAppTablesV1, __SkAppTablesV1, SkAppQueryForm, __SkAppQueryForm } from '@skzz/platform'
import { setData, VkDuplexCalc } from '@vunk/core'
import CUForm from './cu-form/index.vue'
import { Row } from './types'
import { ElButton } from 'element-plus'
import { SkRoleTablesSelect } from '@skzz-platform/components/role-tables-select'
import { Role } from '@skzz-platform/api/system/role'
import { SkIncreaseButton } from '@skzz-platform/components/increase-button'
type Col = __SkAppTablesV1.Column<Row>


const queryItems:__SkAppQueryForm.CoreFormItem[] = [
  {
    prop: 'code',
    templateType: 'VkfInput',
    label: '账号',
  },
  {
    prop: 'name',
    label: '姓名',
    templateType: 'VkfInput',
  },
]
const queryState = reactive({
  data: {} as Partial<Row>,
})

const tableState = reactive({
  data: [] as Row[],
  _columns: [
    {
      prop: 'id',
      label: 'ID',
    },
    {
      prop: 'code',
      label: '账号',
    },
    {
      prop: 'name',
      label: '姓名',
    },
    {
      prop: 'sex',
      label: '性别',
      slots: ({
        row,
      }) => row.sex == 1 ? '男' : '女',
    },
    {
      prop: 'mobile',
      label: '手机号',
    },
    

    {
      prop: undefined,
      label: '操作',
      slots: ({ row }) => <SkAppOperations
        api={ rUserBtns }
        onU={ () => preuI(row) }
        onD={ () => d([row.id])  }
        onClick={ (e: string) => {
          if (e === 'bind') {
            preBind(row)
          }
        } }
      >
      </SkAppOperations>,
      align: 'center',
      headerAlign: 'center',
    },
  ] as Col[],
  columns: [] as Col[],
  query: {},
  pagination: {
    pageSize: 10,
    start: 0,
  },
  total: 0,
})

const cuState = reactive({
  type: '' as 'c' | 'u' | '',
  data: {} as Partial<Row>,
})
const cuData = computed(() => {
  return {
    ...cuState.data,
  }
})

const bindState = reactive({
  current: {} as Partial<Row>,
  data: [] as Role[],
})


watch(() => tableState.pagination, r, { deep: true, immediate: true })
watch(() => queryState.data, r, { deep: true })
function r () {
  return rUsers(queryState.data, tableState.pagination).then(res => {
    if (!tableState.columns.length) {
      tableState.columns = [
        // ...res.columns as Col[],
        ...tableState._columns,
      ]
    }
    tableState.data = res.rows
    tableState.total = res.total
  })
}
function d (ids: string[]) {
  dUsers(ids).then(() => {
    r()
  })
}
function precI () {
  cuState.type = 'c'
  cuState.data = {}
}
function preuI (row: Row) {
  cuState.type = 'u'
  cuState.data = {...row}
}
function cuI () {
  cuUser(cuData.value).then(() => {
    r()
    cuState.type = ''
  })
}
async function preBind (row: Row) {
  bindState.current = row
  const res = await rBoundUsers({
    userId: row.id,
  })
  bindState.data = res.rows.map(item => {
    return {
      roleId: item.roleId,
    } as Role
  })

  
}

function bind () {
  return cBoundUsers(
    bindState.data.map(item => {
      if (!bindState.current.id) {
        throw TypeError('userId 是必须的')
      }
      return {
        roleId: item.roleId,
        userId: bindState.current.id,
      }
    },
    ), true)
}



</script>
<template>
  <page-x>
    <VkDuplexCalc class="pa-page h-full">
      <template #one>
        <SkAppQueryForm
          :formItems="queryItems"
          :data="queryState.data"
          @setData="setData(queryState.data, $event)"
        >
        <template #options>
          <SkIncreaseButton 
            :btns="rUserBtns()"
            @click="precI()"
          >
          </SkIncreaseButton>
        </template>
        </SkAppQueryForm>
      </template>

      <SkAppTablesV1 
        :defaultExpandAll="true"
        flex-1
        :rowKey="'menuId'"
        :columns="tableState.columns"
        :data="tableState.data"
        :total="tableState.total"
        v-model:page-size="tableState.pagination.pageSize"
        v-model:start="tableState.pagination.start"
      >
      </SkAppTablesV1>


    </VkDuplexCalc>

    <SkAppDialog
      :modelValue="!!cuState.type"
      @update:modelValue="cuState.type = ''"
      :title="cuState.type === 'u' ? '编辑' : '新增'"
    >
      <CUForm
        :type="cuState.type"
        :data="cuState.data"
        @setData="setData(cuState.data, $event)"
        @submit="cuI"
      ></CUForm>
    </SkAppDialog>

    <SkAppDialog 
      :title="'角色绑定'"
      :modelValue="!!bindState.current.id"
      @update:modelValue=" bindState.current = {}"
    >
      <SkRoleTablesSelect
        class="h-50vh"
        v-model="bindState.data"
      >

      </SkRoleTablesSelect>

      <template #footer>
        <ElButton :type="'primary'" :size="'large'"
          @click="bind"
        >提交</ElButton>
      </template>
    </SkAppDialog>
  </page-x>
</template>

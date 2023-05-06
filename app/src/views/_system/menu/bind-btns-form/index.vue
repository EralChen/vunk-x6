<script lang="ts" setup>
import { ElTransfer, TransferDataItem, TransferDirection, TransferKey } from 'element-plus'
import { rButtons } from '@skzz/platform/api/system/button'
import { rMenusWithButtons, cMenuButtons, dMenuButtons } from '@skzz/platform/api/system/menu'
import { ref, watch } from 'vue'

const props = defineProps({
  menuId: {
    type: String,
  },
  id: {
    type: String,
  },
})


const data = ref<TransferDataItem[]>([])
const value = ref<TransferKey[]>([])
const valueChange = async (
  value: TransferKey[], 
  direction: TransferDirection, 
  movedKeys: any[],
) => {
  if (!props.menuId) return

  if (direction === 'right') {
    await cMenuButtons(
      props.menuId,
      movedKeys,
    ).finally(r)
  }

  if (direction === 'left') {
    await dMenuButtons(
      props.menuId,
      movedKeys,
    ).finally(r)
  }
  
}

rData()
watch(() => props.id, r, { immediate: true })
function r () {
  if (!props.id) return
  
  rMenusWithButtons({
    ids: [props.id],
  }).then(res => {
    const doc = res[0]

    if (doc?.buttons) {
      value.value = doc.buttons.map(v => {
        return v.buttonId
      }) 
    }
   
  })
}
function rData () {
  rButtons().then(res => {
    data.value = res.rows.map((item) => {
      return {
        key: item.buttonId,
        label: item.label,
      }
    })
  })
}
</script>
<template>
  <ElTransfer 

    sk-flex="row-center2"
    v-model="value"
    :data="data"
    :titles="['未绑列表', '已绑列表']"
    @change="valueChange"
  >
  </ElTransfer>
</template>

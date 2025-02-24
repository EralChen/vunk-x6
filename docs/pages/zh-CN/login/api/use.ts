import type { Media } from '@vunk/shared'
import type { Ref } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { rLoginTenants } from '.'

export function useLoginTenantMedia () {
  const loginTenantOptions = ref([
  ]) as Ref<Media[]>

  const loginTenantMap = computed(() => {
    return loginTenantOptions.value.reduce((acc, item) => {
      acc[item.value] = item
      return acc
    }, {} as Record<string, Media>)
  })

  onMounted(read)

  function read () {
    rLoginTenants().then((res) => {
      loginTenantOptions.value = res.map(item => ({
        label: item.name,
        value: item.tenantId,
      }))
    })
  }

  return {
    loginTenantOptions,
    loginTenantMap,
  }
}

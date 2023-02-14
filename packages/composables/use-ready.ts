import { ref, ShallowRef, shallowRef } from 'vue'

export const useReady = <T>(promise: Promise<T>) => {
  const ready = ref(false)
  const result = shallowRef() as ShallowRef<T>
  promise.then((res) => {
    result.value = res
    ready.value = true
  })
  return {
    ready,
    result,
  }
}

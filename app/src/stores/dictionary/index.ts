import { defineStore } from 'pinia'
import { rDic, Dictionary } from '@skzz-platform/api/system/dictionary'
import { Ref, reactive } from 'vue'

type withDic<T extends string[]> = {
  [key in T[number]]: Dictionary[]
}

export const useDictionaryStore = defineStore('dictionary', () => {
  const types = reactive<withDic<['消息接收端']>>({
    '消息接收端': [],
  })


  async function getTypes (type: string, key: keyof typeof types, ref?: Ref<any>) {
    if (types[key].length) {
      ref && (ref.value = types[key])
      return types[key]
    }
    const res = await rDic(type)
    types[key] = res
    ref && (ref.value = types[key])
    return types[key]
  }

  function getTemplateDic (ref?: Ref<any>) {
    return getTypes('消息接收端', '消息接收端', ref)
  }


  return {
    getTemplateDic,
    types,
    getTypes,
  }
})

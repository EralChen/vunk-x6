<script lang="tsx" setup>
import type { __SkAppForm } from '@skzz/platform/components/app-form'
import type { baseGap } from '@skzz/platform/theme'
import type { NormalObject, SetDataEvent } from '@vunk/core'
// import { FormItemRendererSource, VkfForm } from '@vunk/form'
import { useThemeStore } from '@/stores/theme'
import { SkAppForm } from '@skzz/platform/components/app-form'
import { setData } from '@vunk/core'
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const themeStore = useThemeStore()

const formData = computed(() => {
  const obj: NormalObject = {}
  Object.entries(themeStore.gapBaseStyles).forEach(([k, v]) => {
    if (k.startsWith('--gap-')) {
      obj[k] = +v.replace('rem', '')
    }
    else {
      obj[k] = v
    }
  })
  return obj
})
function setFormData (e: SetDataEvent) {
  if (e.k.startsWith('--gap-')) {
    e.v = `${e.v}rem`
  }
  setData(themeStore.gapBaseStyles, e)
}

const formItems: __SkAppForm.FormItem<keyof typeof baseGap>[] = [
  {
    templateType: 'VkfInputNumber',
    prop: '--gap-xxs',
    label: 'gap-xxs',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--gap-s',
    label: 'gap-s',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--gap-m',
    label: 'gap-m',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--gap-l',
    label: 'gap-l',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--gap-xl',
    label: 'gap-xl',
    step: 0.1,
  },
  {
    templateType: 'VkfInputNumber',
    prop: '--gap-xxl',
    label: 'gap-xxl',
    step: 0.1,
  },

]

const formItemWithLayout = computed(() => {
  return formItems.map((_item) => {
    const item = _item as __SkAppForm.CoreFormItem
    return {
      templateType: 'VkfFlex',
      direction: 'row',
      align: 'baseline',
      templateSlots: [
        item,
        {
          templateType: 'Component',
          is: () => {
            return (
              <div class="ml-4r">
                <span>
                  {' '}
                  {item.label}
                  {' '}
                </span>
                <span style={
                  {
                    marginLeft: `var(${item.prop})`,
                  }
                }
                >
                  {' '}
                  {item.label}
                  {' '}

                </span>
                <span style={
                  {
                    marginLeft: `var(${item.prop})`,
                  }
                }
                >
                  {' '}
                  {item.label}
                  {' '}

                </span>
              </div>
            )
          },
        },
      ],
    } as __SkAppForm.FormItem
  })
})
</script>

<template>
  <SkAppForm
    label-width="6em"
    :form-items="formItemWithLayout"
    :data="formData"
    v-bind="$attrs"
    @set-data="setFormData"
  >
  </SkAppForm>
</template>

<style>

</style>

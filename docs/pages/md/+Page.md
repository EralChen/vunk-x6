
# Markdown

This page is written in _Markdown_.

Interactive components can be included in the Markdown. 


::: details Getting missing peer deps warnings?
If using PNPM, you will notice a missing peer warning for `@docsearch/js`. This does not prevent VitePress from working. If you wish to suppress this warning, add the following to your `package.json`:

```json
"pnpm": {
  "peerDependencyRules": {
    "ignoreMissing": [
      "@algolia/client-search",
      "search-insights"
    ]
  }
}
```

:::


```vue
<template>
  <PageX>
    <VkClientOnly>
      <MapViewBasic></MapViewBasic>
    </VkClientOnly>
  </PageX>
</template>

<script lang="ts" setup>
import PageX from '#s/components/PageX/index.vue'
import { VkClientOnly } from '@vunk/core/components/client-only'
import { defineAsyncComponent } from 'vue'

const MapViewBasic  = defineAsyncComponent(
  () => import('#e/map-view/basic.vue'),
)
</script>

```

```ts
import PageX from '#s/components/PageX/index.vue'
import { VkClientOnly } from '@vunk/core/components/client-only'
import { defineAsyncComponent } from 'vue'

const MapViewBasic  = defineAsyncComponent(
  () => import('#e/map-view/basic.vue'),
)
```
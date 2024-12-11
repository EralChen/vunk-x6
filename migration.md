## Eslint

1. 删除 `internal/eslint-config`

2. 删除 package.json `internal/eslint-config` 依赖

3. 更新 package.json 其他依赖到最新

4. 安装新的依赖
```shell
pnpm i @antfu/eslint-config unplugin-oxlint -D -w
```

5. 替换 `eslint.config.js` 为新的配置

## docs

1. 备份 `docs` 到 `h.docs`

2. 拷贝新的 `docs` 到项目

3. 替换 `h.docs/examples/**` 到 `docs/examples/** ` 

4. 删除 `docs/examples/.eslintrc.json`

5. 替换  `h.docs/pages/**` 到 `docs/pages/** ` 

6. `+onCreateApp.ts` 补充

```ts
app.provide(ID_INJECTION_KEY, {
  prefix: 1024,
  current: 0,
})
app.component('ClientOnly', VkClientOnly)
```

7. 替换 `h.docs/.env.*` 到 ..

8. 替换 `h.docs/public` 到 ..


9. 重定向首页

```vue
<!-- pages/index/+Page.vue -->
<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import { navigate } from 'vike/client/router'
export default defineComponent({
  setup () {

    onBeforeMount(() => {
      navigate(import.meta.env.BASE_URL + 'zh-CN/guide/introduction')
    })

    return () => null
  },
})
</script>
```

10. 如果 docs 将部署到 github pages，添加 `onHydrationEnd` 以规范URL

```ts
// page/+onHydrationEnd.ts
import type { PageContext } from 'vike/types'
import { navigate } from 'vike/client/router'
export async function onHydrationEnd (pageContext: PageContext) {
  const { urlOriginal } = pageContext
  if (urlOriginal.endsWith('/')) { // clean up trailing slash
    navigate(urlOriginal.slice(0, -1))
  }
}

```


## App

1. 新增 `tagsViewBy` 路由选项

```ts
// app/typings/router.d.ts
interface RouteMeta {
  // ...

  /**
   * 添加到标签页的主键
   * @default path
   */
  tagsViewBy?: 'path' | 'name'
}
```
```ts
// app/src/stores/views/index.ts
// collectingVisitedViews function 逻辑替换
if (
  newRoute.meta?.title
  && newRoute.meta?.tagsView !== false
) {
  const tagsViewBy = newRoute.meta?.tagsViewBy || 'path'

  const { index } = delVisitedView({
    [tagsViewBy]: newRoute[tagsViewBy],
  })
  addVisitedView({ ...newRoute }, index)
}

// delVisitedView query 参数添加
const delVisitedView = (query: {
  fullPath?: string
  path?: string
  name?: string
}) => {
  // ...
}
```


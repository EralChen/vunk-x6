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

```ts
// pages/index/+data.ts
import { redirect } from 'vike/abort'

export async function data() {
    throw redirect(import.meta.env.BASE_URL + 'zh-CN/guide/introduction')
}

```


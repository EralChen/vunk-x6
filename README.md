## 多应用改造

1. 拷贝基础app文件夹
2. 重命名
3. 添加文件夹名称到 `pnpm-workspace.yaml`
4. `pnpm i`
5. 启动应用 `pnpm run -C [name] dev`

## 使用 arcgis/core
1. pnpm i
2. npm run app:init-arcgis

3. main.ts 配置 esriConfig

## 删除 arcgis/core

1. 删除依赖 "@arcgis/core", "@types/arcgis-js-api", "@vuesri/core"

2. 清理 types
```ts
// app/ tsconfig.json
  "types": [
    "node",
    - "arcgis-js-api",
  ],
```

3. 清除 styles
```ts
// styles index.ts
- import './esri'
```

4. 重置 Viewer 组件
```jsx
// app/components/Viewer/index.vue
<script lang="ts" setup>
</script>
<template>
  <div></div>
</template>
```

5. pnpm i

## 改造为新的lib仓库

### 修改名称

1. 将包名`@vunk/x6` 和 别名`@vunk-x6` 全局替换
   > 如现在要发布一个 @vuesium/mars3d 的包, 则将：
   > `@vunk/x6` => `@vuesium/mars3d`
   > `@vunk-x6` => `@vuesium-mars3d`

2. `pnpm i` 重新装包

### 设置组件前缀

internal/build-constants/name.ts

```ts
/**
 * 新建的组件将以 LIB_PRE 作为前缀
 */
export const LIB_PRE = 'xxx'
```

### 设置排除的依赖

internal/build-constants/config.ts

```ts
/**
 * libExternal 将在打包的时候排除
 */
export const libExternal = [
  'vue',
  /^@vunk\/core/,
  // /^@antv\/g6/,
  /^cesium/, // 添加 External
  new RegExp(`^${LIB_NAME}`),
  new RegExp(`^${LIB_ALIAS}`),
]
```

### package.json

1. 清理原来安装的依赖(依据实际情况)

   ```json
   - "@arcgis/core": "^4.25.5",
   ```

2. 如果需要添加新的依赖

   ```shell
   pnpm i [xxx] -S -w
   ```

3. `pnpm i`  重新装包

### 清理原有组件

1. 删除 `packages/components` 所有文件夹，不包括文件
2. 删除 `packages/composables` ，`use-*.ts` 文件，清空 `index.ts`

### 清理 docs

1. 重写 `docs\renderer\crowdin\zh-CN\pages\component.json`

   ```json
   {	/* 将会作为一个栏目, 在组件文档左侧栏显示 */
     "basic": {
       "text": "Basic 基础组件", // 栏目标题
       "children": [
         {
           "link": "/xxx", // url路径
           "text": "xxx" // 展示名称
         }
       ]
     }
   }
   ```

2.  删除 `docs\examples` 所有文件及文件夹

3.  删除 `docs\pages\zh-CN\component`  所有文件及文件夹

### 建立第一个组件

1. 新建组件

  ```shell
  npm run cc -- --name your-component-name
  ```

  + 该命令会自动根据模板，在`packages\components`  下生成该名称的组件模板

2. 建立相关docs文件

  ```shell
  npm run ccd -- --p basic --l map --t "Map 地图"
  ```

  + 该命令会自动在 `docs\renderer\crowdin\zh-CN\pages\component.json`生成记录
    + `--p` 指的是 `pages/component.json` 中的栏目
    + `--l`  、`--t` 分别用于该栏目 `children`  下的 `link` 、`text`
  + 该命令会自动在 `docs\pages\zh-CN\component` 生成基础的 md 文件

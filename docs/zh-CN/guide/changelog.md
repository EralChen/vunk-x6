---
title: '更新日志'
lang: zh-CN
---

<style scoped lang="scss">
@at-root .hero-content {
  padding: 32px;
}
</style>

# 更新日志

## Esri样式引入变更

1. 删除 app/src/styles/esri/_themes 文件夹;

2. 删除  app/src/styles/esri/themes.scss 文件;
   取消 app/src/styles/esri/index.ts 对其的引用;

3. 添加 app/src/init-esri.ts 文件;
   在 app/src/main.ts 中引入该文件;

4. 添加 app/src/composables/use-init-esri-theme.ts 文件

   在 app/src/composables/use-init-theme.ts 中添加

   ```ts
   export const useInitTheme = () => {   
      // ...
      useInitEsriTheme()
    }
   ```

5. 更新替换 scripts/app/init-arcgis.ts 文件

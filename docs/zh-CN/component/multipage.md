--- 
title: Multipage
lang: zh-CN
---

# Multipage

Multipage


## 基础用法

:::demo 
multipage/basic
:::

## Multipage Props

|prop|type|default|descriptions|
|-|-|-|-|
|:modules|Media[]|-|标签选项|
|v-model*|String|-|当前选中标签|
|lazy| Boolean | true | 内容懒加载 |



## Multipage Slots
|name|arguments|descriptions|
|-|-|-|
|\`${module.value}\`| - | 不同标签展示的内容 |
|\`${module.value}__options\`| - | 不同标签操作区域 |

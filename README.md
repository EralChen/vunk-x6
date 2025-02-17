# @vunk/x6

基于 [x6](https://x6.antv.antgroup.com/) 的 Vue3 组件库, 基于业务二次封装。

## 特性

### Port连接控制

本库扩展了X6的端口连接机制，提供了更灵活的连接控制能力。

#### magnet-rule

通过自定义属性 `magnet-rule` 来控制节点端口的连接行为：

```ts
// 在 port/src/const.ts 中定义
export enum MagnetRule {
  /**
   * 当前节点只允许主动输出
   * - 只能作为连接的起点
   * - 不能作为连接的终点
   */
  active = 'active',

  /**
   * 当前节点只允许被动输入
   * - 只能作为连接的终点
   * - 不能作为连接的起点
   */
  passive = 'passive',
}
```

#### 使用示例

1. 配置端口属性：
```ts
// 定义一个只能输出的端口
const ports: PortManager.PortMetadata[] = [{
  group: 'right',
  attrs: {
    circle: {
      'magnet': true,
      'magnet-rule': MagnetRule.active // 标记为只能输出
    }
  }
}]
```

2. 默认验证规则：
Graph组件已内置以下验证逻辑：
- validateConnection：检查目标端口，拒绝连接到active（输出）端口
- validateMagnet：检查源端口，阻止从passive（输入）端口发起连接

这样的设计让你可以：
- 轻松控制节点的输入/输出行为
- 灵活地定义不同类型节点的连接规则
- 在Graph层面统一处理连接验证

#### 实际应用

常见使用场景：
- Start节点：设置 magnet-rule="active"，确保只能作为起点
- End节点：设置 magnet-rule="passive"，确保只能作为终点
- 中间处理节点：不设置magnet-rule，允许双向连接

### Selction ZIndex

默认的选中框会被节点覆盖

```css
.vk-graph .x6-graph-svg {
  z-index: 2;
}
.vk-graph .x6-widget-selection {
  z-index: 1;
}
```

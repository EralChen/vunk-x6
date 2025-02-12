## 参考

原生中可以通过一些方法修改选框的行为，如下

```ts
this.graph.toggleMultipleSelection(options.multiple)
this.graph.toggleSelectionMovable(options.movable)
this.graph.toggleRubberband(options.rubberband)
this.graph.toggleStrictRubberband(options.strict)
this.graph.setSelectionFilter(options.filter)
this.graph.setRubberbandModifiers(options.modifiers as any)
this.graph.setSelectionDisplayContent(
  options.content
    ? (selection) => {
      return `${selection.length} node${
        selection.length > 1 ? 's' : ''
      } selected.`
    }
    : null,
)
```

## TODO

- [ ] 通过 props 实现这些参数传入，用 `WatchEffect` 调整实例状态

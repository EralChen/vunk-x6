# X6 图形数据格式与 LangGraph 使用指南

## 数据结构概览

X6 导出的图形配置是一个包含 `cells` 数组的 JSON 对象，其中包含所有节点和连线：

```json
{
  "cells": [
    // 节点和边的定义
  ]
}
```

### 节点定义

每个节点对象包含以下关键信息：

```json
{
  "position": {
    "x": 100, // 节点x坐标
    "y": 100 // 节点y坐标
  },
  "size": {
    "width": 300, // 节点宽度
    "height": 150 // 节点高度
  },
  "shape": "VkRegisterStartNode", // 节点类型
  "id": "node-1", // 节点唯一标识
  "data": {}, // 节点业务数据
  "ports": { // 端口定义
    "items": [ // 具体端口列表
      {
        "group": "input", // 端口分组
        "id": "port-1" // 端口标识
      }
    ]
  }
}
```

### 边的定义

边对象定义了节点之间的连接关系：

```json
{
  "shape": "edge",
  "id": "edge-1",
  "source": {
    "cell": "node-1", // 源节点ID
    "port": "output-1" // 源节点端口ID
  },
  "target": {
    "cell": "node-2", // 目标节点ID
    "port": "input-1" // 目标节点端口ID
  }
}
```

## 关键节点类型说明

### 1. 开始节点 (VkRegisterStartNode)

```json
{
  "shape": "VkRegisterStartNode",
  "data": {
    "input": [
      {
        "name": "query", // 输入参数名
        "type": "string" // 参数类型
      }
    ]
  }
}
```

### 2. LLM 节点 (VkRegisterLlmNode)

```json
{
  "shape": "VkRegisterLlmNode",
  "data": {
    "modelId": "gpt-3.5-turbo", // 模型ID
    "prompt": "你好" // 提示词
  }
}
```

### 3. 结束节点 (VkRegisterEndNode)

```json
{
  "shape": "VkRegisterEndNode",
  "data": {
    "output": [
      {
        "name": "response", // 输出参数名
        "type": "string" // 参数类型
      }
    ],
    "textTemplate": "{{response}}" // 输出模板
  }
}
```

## LangGraph 使用指南

### 1. 配置解析

LangGraph 可以按以下步骤解析配置：

1. 遍历 cells 数组，分别处理节点和边
2. 根据 shape 字段识别节点类型
3. 从 data 字段获取节点配置
4. 通过边的定义构建节点间的连接关系

### 2. 节点处理

```python
from typing import TypedDict, List
from operator import itemgetter
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langgraph.prebuilt import ToolExecutor
from langgraph.graph import END, StateGraph

class NodeConfig(TypedDict):
    shape: str
    id: str
    data: dict

def create_llm_node(config: NodeConfig):
    # 配置 LLM
    model = ChatOpenAI(model=config["data"]["modelId"])
    prompt = ChatPromptTemplate.from_template(config["data"]["prompt"])

    def node_func(state):
        # 从状态中获取输入
        inputs = state["input"]
        # 处理输入，调用模型
        formatted = prompt.format(**inputs)
        response = model.invoke(formatted)
        # 更新状态
        return {"response": response.content}

    return node_func

def create_end_node(config: NodeConfig):
    template = config["data"]["textTemplate"]

    def node_func(state):
        # 从状态中获取数据
        response = state["response"]
        # 应用输出模板
        result = template.format(response=response)
        # 更新状态
        return {"result": result}

    return node_func
```

### 3. 图的构建和执行

```python
def build_workflow(config: dict):
    # 创建工作流图，跟踪状态
    graph = StateGraph()

    # 解析节点
    nodes = {}
    for cell in config["cells"]:
        if cell["shape"] == "VkRegisterLlmNode":
            nodes[cell["id"]] = create_llm_node(cell)
        elif cell["shape"] == "VkRegisterEndNode":
            nodes[cell["id"]] = create_end_node(cell)

    # 添加节点到图
    for node_id, node_func in nodes.items():
        graph.add_node(node_id, node_func)

    # 添加边
    for cell in config["cells"]:
        if cell["shape"] == "edge":
            source = cell["source"]["cell"]
            target = cell["target"]["cell"]
            if target in nodes:
                graph.add_edge(source, target)
            else:
                # 如果是终点，设置条件
                graph.set_finish_condition(source, lambda x: True)

    # 设置入口节点
    graph.set_entry_point("start")

    # 编译图
    workflow = graph.compile()
    return workflow

# 使用示例
def run_workflow():
    # 加载配置
    with open("x6-data.json") as f:
        config = json.load(f)

    # 构建工作流
    workflow = build_workflow(config)

    # 执行工作流
    inputs = {
        "input": {
            "query": "用户问题",
            "conversationId": "123"
        }
    }
    result = workflow.invoke(inputs)
    return result
```

## 最佳实践

1. **数据验证**
   - 验证必要的节点是否存在（开始、LLM、结束节点）
   - 检查节点连接的完整性
   - 验证参数类型的匹配性

2. **错误处理**
   - 处理可能的配置错误
   - 提供清晰的错误信息
   - 实现错误恢复机制

3. **数据流控制**
   - 确保数据在节点间正确传递
   - 处理可能的数据类型转换
   - 实现参数映射关系

4. **扩展性考虑**
   - 支持添加新的节点类型
   - 允许自定义节点处理逻辑
   - 提供配置覆盖机制

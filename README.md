
## 概念

| 英文 | 中文 | 概念 |
| ---- | ---- | ---- |
| project | 项目 | 一个项目，一个项目包含多个页面（视图） | 
| view | 视图 | 项目中的一个页面，多个页面组成一个项目，一个项目包含多个组件 |
| component | 组件 | 页面中的一个组件，多个组件组成一个页面，一个组件也可以由多个子组件组成 |

## 项目结构

一个`project`由多个`view`组成，一个`view`由多个`component`组成。

- `project`中包含`config`(项目配置)和`subsets`(视图配置列表)
- `view`中包含`config`(视图配置，会被`project.subsets`中的配置覆盖)和`subsets`(组件配置列表)
- `component`中包含`config`(组件配置，会被`view.subsets`中的配置覆盖)

> 注：组件如果嵌套的话，也会包含`subsets`配置列表

具体结构如下：

```
project
  |——view
  |   |——component
  |   |   |——component
  |   |   |——component
  |   |   |——...
  |   |——component
  |   |——...
  |——view
  |   |——component
  |   |——...
  |——...
```

## Project（项目）

## View（视图）

## Component（组件）

## 那些坑

[坑](PIT.md)
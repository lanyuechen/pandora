## 原则

- 项目只能配置视图的行为，组件的行为由视图进行配置

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

| 属性 | 类型 | 描述 | 是否必须 |
| ---- | ---- | ---- | ---- |
| _id | string | 项目id | 系统生成 |
| name | string | 项目名 | 是 |
| desc | string | 项目简介 | 否 |
| ct | string | 项目创建时间 | 系统生成 |
| ut | string | 项目更新时间 | 系统生成 |
<!-- | config | object | 项目配置 | 预留 | -->
| subsets | [ViewConfig\[\]](#viewconfig) | 项目下各视图配置列表 | 是，默认为“[]” |

### ViewConfig

| 属性 | 类型 | 描述 | 是否必须 |
| ---- | ---- | ---- | ---- |
| cid | string | 视图id | 是 |
| path | string | 视图访问路径 | 是 |
| layout | string | 视图布局方式 | 是，默认为“auto” |

## View（视图）

| 属性 | 类型 | 描述 | 是否必须 |
| ---- | ---- | ---- | ---- |
| _id | string | 视图id | 系统生成 |
| name | string | 视图名 | 是 |
| desc | string | 视图简介 | 否 |
| ct | string | 视图创建时间 | 系统生成 |
| ut | string | 视图更新时间 | 系统生成 |
<!-- | config | object | 视图配置 | 预留, 考虑与[ViewConfig\[\]](#viewconfig)结构保持一致 | -->
| subsets | [ComponentConfig\[\]](#componentconfig) | 视图下各组件配置列表 | 是，默认为“[]” |

### ComponentConfig

| 属性 | 类型 | 描述 | 是否必须 |
| ---- | ---- | ---- | ---- |
| cid | string | 组件id | 是 |
| props | any | 组件props属性 | 是，默认为“{}” |

## Component（组件）

| 属性 | 类型 | 描述 | 是否必须 |
| ---- | ---- | ---- | ---- |
| _id | string | 组件id | 系统生成 |
| name | string | 组件名 | 是 |
| desc | string | 组件简介 | 否 |
| component | string | 组件对应的react组件名称 | 是 |
| ct | string | 组件创建时间 | 系统生成 |
| ut | string | 组件更新时间 | 系统生成 |
<!-- | config | object | 视图配置 | 预留, 考虑与[ComponentConfig\[\]](#componentconfig)结构保持一致 | -->
<!-- | subsets | [ComponentConfig\[\]](#componentconfig) | 预留，考虑组件嵌套 | -->

## 组件定义

- 组件定义在`/wardrobe`下，每个组件单独占用一个目录，并在`index.ts`中导出
- 每个组件包含两部分，一部分是组件本身的定义，一部分是组件`props表单`的定义，`props表单`将渲染在配置页面，用于配置组件的props属性

## 那些坑

[坑](PIT.md)
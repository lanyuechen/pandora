
## 概念

| 英文 | 中文 | 概念 |
| ---- | ---- | ---- |
| project | 项目 | 一个项目，一个项目包含多个页面（视图） | 
| view | 视图 | 项目中的一个页面，多个页面组成一个项目，一个项目包含多个组件 |
| component | 组件 | 页面中的一个组件，多个组件组成一个页面，一个组件也可以由多个子组件组成 |

## 等待官方修复的bug

| 框架 | 版本 |
| ---- | ---- |
| taro | v3.0.5 |
| taro-ui | v3.0.0-alpha.3 |

1. AtSwipeAction组件使用时报错

原因： 组件引用入口为`taro-ui/dist/index.umd.js`导致部分打包后的函数`undefined`<br />

解决方式：将组件引用入口改为`taro-ui/dist/index.esm.js`(通过修改`taro-ui`的`package.json`文件实现)

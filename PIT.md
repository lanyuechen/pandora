## 坑

| 框架 | 版本 |
| ---- | ---- |
| taro | v3.0.5 |
| taro-ui | v3.0.0-alpha.3 |
| Debug base library | 2.12.2 |
| Weixin Devtools | 1.03.2008270 |

### 微信小程序的坑

- [ ] 远程调试自定义tabbar不显示
    > 目前的解决办法是不使用这个功能。。。
- [x] 自定义tabbar切换时选中状态每次都会选中第一个，然后再切换到真正选中的tab上
    > 因为每个tab页面都是一个新的实例，如果给tabbar设置了默认值，则第一次渲染的时候都会先选中默认值

### Taro的坑

- [ ] taro3不能获取tabbar实例
- [ ] Taro自定义tabbar状态维护问题
    > 目前通过全局事件解决，待优化
- [ ] Taro自定义tabbar切换页面闪烁
    > 目前通过把几个tab页面做到同一个页面上，并且通过状态进行显示隐藏实现
- [ ] git上提的很多问题都没有人响应
    > 垃圾

### Taro-ui的坑

- [x] AtSwipeAction组件使用时报错【已解决】
    > 原因： 组件引用入口为`taro-ui/dist/index.umd.js`导致部分打包后的函数`undefined`<br />
    解决方式：将组件引用入口改为`taro-ui/dist/index.esm.js`(通过修改`taro-ui`的`package.json`文件实现)
- [ ] AtSwipeAction组件卡顿

### 不知道是谁的坑的坑

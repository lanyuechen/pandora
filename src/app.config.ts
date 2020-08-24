export default {
  pages: [
    'pages/index',                // 首页
    'pages/project',              // 控制台（项目列表）
    'pages/project/create',       // 控制台-创建项目
    'pages/project/:id',          // 项目详情（组件列表）
    'pages/profile',              // 个人页
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}

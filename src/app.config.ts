export default {
  pages: [
    'pages/projects',             // 项目列表
    'pages/projects/optimset',    // 项目列表-创建或修改项目（根据是否包含 ?id=项目id 决定是创建还是修改）
    'pages/projects/detail',      // 项目列表-项目详情 ?id=项目id
    'pages/views',                // 视图列表
    'pages/views/optimset',       // 视图列表-创建或修改视图（根据是否包含 ?id=视图id 决定是创建还是修改）
    'pages/views/detail',         // 视图列表-视图详情 ?id=组件id
    'pages/components',           // 组件列表
    'pages/components/create',    // 组件列表-创建组件
    'pages/profile',              // 个人页
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}

export default {
  pages: [
    'pages/projects/index',             // 项目列表
    'pages/projects/optimset/index',    // 项目列表-创建或修改项目（根据是否包含 ?id=项目id 决定是创建还是修改）
    'pages/projects/detail/index',      // 项目列表-项目详情 ?id=项目id
    'pages/projects/config/index',      // 项目列表-项目详情-视图配置 ?id=项目id&idx=视图配置索引

    'pages/views/index',                // 视图列表
    'pages/views/optimset/index',       // 视图列表-创建或修改视图（根据是否包含 ?id=视图id 决定是创建还是修改）
    'pages/views/detail/index',         // 视图列表-视图详情 ?id=视图id
    'pages/views/config/index',         // 视图列表-视图详情-组件配置 ?id=视图id&idx=组件配置索引

    'pages/components/index',           // 组件列表
    'pages/components/optimset/index',  // 组件列表-创建或修改组件（根据是否包含 ?id=组件id 决定是创建还是修改）
    'pages/components/detail/index',    // 组件列表-组件详情 ?id=组件id
  ],
  tabBar: {
    custom: true,
    color: '#bbc0ca',
    selectedColor: '1f83e1',
    backgroundColor: '#feffff',
    borderStyle: 'white',
    list: [
     {
      "pagePath": "pages/projects/index",
      "text": "项目"
     },
     {
      "pagePath": "pages/views/index",
      "text": "视图"
     },
     {
      "pagePath": "pages/components/index",
      "text": "组件"
     }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationStyle: 'custom',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}

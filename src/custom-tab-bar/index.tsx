import React, { useMemo } from 'react';
import Taro from '@tarojs/taro';
import { AtTabBar } from 'taro-ui';
import 'taro-ui/dist/style/components/tab-bar.scss';
import 'taro-ui/dist/style/components/icon.scss';

export default () => {
  const tabList = useMemo(() => [
    { title: '项目1', iconType: 'bookmark', url: '/pages/projects/index'},
    { title: '视图2', iconType: 'iphone', url: '/pages/views/index'},
    { title: '组件3', iconType: 'money', url: '/pages/components/index'},
  ], []);

  const current = 0//tabList.findIndex((tl: any) => window.location.pathname.includes(tl.url));

  const handleClick = (idx: number) => {
    Taro.switchTab({
      url: tabList[idx].url
    });
  }

  return (
    <AtTabBar
      fixed
      tabList={tabList}
      onClick={handleClick}
      current={current}
    />
  )
}

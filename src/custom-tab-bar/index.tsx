import React, { useMemo } from 'react';
import Taro from '@tarojs/taro';
import { AtTabBar } from 'taro-ui';

export default () => {
  const tabList = useMemo(() => [
    { title: '项目', iconType: 'bookmark', url: '/pages/projects/index'},
    { title: '视图', iconType: 'iphone', url: '/pages/views/index'},
    { title: '组件', iconType: 'money', url: '/pages/components/index'},
  ], []);

  const handleClick = (idx: number) => {
    Taro.switchTab({
      url: tabList[idx].url
    });
  }

  return (
    <AtTabBar
      tabList={tabList}
      onClick={handleClick}
      current={0}
    />
  )
}

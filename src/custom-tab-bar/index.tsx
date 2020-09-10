import React, { useEffect, useMemo, useState } from 'react';
import Taro from '@tarojs/taro';
import { AtTabBar } from 'taro-ui';
import CustomEvent from '@/utils/custom-event';

import './index.scss';

export default () => {
  useEffect(() => {
    CustomEvent.onOnce('switch-tab', (idx: number) => {
      setCurrent(idx);
    })
  });

  const tabList = useMemo(() => [
    { title: '项目', iconType: 'bookmark', url: '/pages/projects/index'},
    { title: '视图', iconType: 'iphone', url: '/pages/views/index'},
    { title: '组件', iconType: 'money', url: '/pages/components/index'},
  ], []);

  const [ current, setCurrent ] = useState(0);

  const handleClick = (idx: number) => {
    Taro.switchTab({
      url: tabList[idx].url
    });
  }

  return (
    <AtTabBar
      className="tabbar"
      tabList={tabList}
      onClick={handleClick}
      current={current}
    />
  )
}
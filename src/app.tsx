import React, { useMemo } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtTabBar } from 'taro-ui';

import './app.scss';

export default (props: any) => {
  const tabList = useMemo(() => [
    { title: '项目', iconType: 'bookmark', url: '/pages/projects'},
    { title: '视图', iconType: 'iphone', url: '/pages/views'},
    { title: '组件', iconType: 'money', url: '/pages/components'},
  ], []);

  const current = tabList.findIndex((tl: any) => window.location.pathname.includes(tl.url));

  const handleClick = (idx: number) => {
    if (idx !== current) {
      Taro.redirectTo({
        url: tabList[idx].url
      })
    }
  }

  return (
    <View>
      <View className="main-container">
        {props.children}
      </View>
      <AtTabBar
        fixed
        tabList={tabList}
        onClick={handleClick}
        current={current}
      />
    </View>
  )
}

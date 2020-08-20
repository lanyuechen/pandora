import React, { useState, useMemo } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtTabBar } from 'taro-ui';

import './app.scss';

export default (props: any) => {
  const [ current, setCurrent ] = useState<number>(0);
  const tabList = useMemo(() => [
    { title: '首页', iconType: 'home', url: '/pages/index' },
    { title: '工作台', iconType: 'lightning-bolt', url: '/pages/workbench'},
    { title: '个人页', iconType: 'user', url: '/pages/profile'},
  ], []);

  const handleClick = (idx: number) => {
    if (idx !== current) {
      Taro.redirectTo({
        url: tabList[idx].url
      })
      setCurrent(idx);
    }
  }

  return (
    <View>
      {props.children}
      <AtTabBar
        fixed
        tabList={tabList}
        onClick={handleClick}
        current={current}
      />
    </View>
  )
}

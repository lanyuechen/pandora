import React from 'react';
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import Taro from '@tarojs/taro';

import './index.scss'

export default () => {
  const toHome = () => {
    Taro.redirectTo({
      url: '/pages/index'
    })
  }

  return (
    <View>
      <Text>profile</Text>
      <AtButton type="primary" onClick={toHome}>首页</AtButton>
    </View>
  )
}

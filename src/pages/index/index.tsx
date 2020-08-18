import React from 'react';
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import Taro from '@tarojs/taro';

import './index.scss'

export default () => {
  const toProfile = () => {
    Taro.redirectTo({
      url: '/pages/profile'
    })
  }

  return (
    <View>
      <Text>hello world</Text>
      <AtButton type="primary" onClick={toProfile}>profile</AtButton>
    </View>
  )
}

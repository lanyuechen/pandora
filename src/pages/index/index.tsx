import React from 'react';
import { View } from '@tarojs/components';
import { AtNavBar } from 'taro-ui';
import config from './index.config';

import './index.scss';

export default () => {
  return (
    <View>
      <AtNavBar
        fixed
        onClickRgIconSt={() => console.log('预留按钮')}
        title={config.navigationBarTitleText}
        rightFirstIconType="bullet-list"
      />
    </View>
  )
}

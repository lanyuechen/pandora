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
        title={config.navigationBarTitleText}
      />
    </View>
  )
}

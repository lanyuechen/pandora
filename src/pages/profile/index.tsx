import React from 'react';
import { View } from '@tarojs/components';
import Navbar from '@/components/navbar';
import config from './index.config';

import './index.scss';

export default () => {
  return (
    <View className="main-container">
      <Navbar
        title={config.navigationBarTitleText}
      />
    </View>
  )
}

import React, { useMemo } from 'react';
import Taro from '@tarojs/taro';
import { AtNavBar } from 'taro-ui';
import { View } from '@tarojs/components';
import { NAVBAR_HEIGHT_ANDROID, NAVBAR_HEIGHT_IOS } from '@/constant';

export default (props: any) => {
  const { style = {}, ...others } = props;
  
  const constainerStyle = useMemo(() => {
    const info = Taro.getSystemInfoSync() || {};
    const navbarHeight = info.platform === 'ios' ? NAVBAR_HEIGHT_IOS : NAVBAR_HEIGHT_ANDROID;
    return {
      ...style,
      height: info.statusBarHeight + navbarHeight,
    };
  }, []);

  return (
    <View className="navbar" style={constainerStyle}>
      <AtNavBar 
        {...others}
        border={false}
        color="#fff"
      />
    </View>
  );
}

import React, { useMemo } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { NAVBAR_HEIGHT_ANDROID, NAVBAR_HEIGHT_IOS } from '@/constant';

export default (props: any) => {
  const { style = {}, children, ...others } = props;
  
  const constainerStyle = useMemo(() => {
    const info = Taro.getSystemInfoSync() || {};
    const navbarHeight = info.platform === 'ios' ? NAVBAR_HEIGHT_IOS : NAVBAR_HEIGHT_ANDROID;
    return {
      ...style,
      paddingTop: info.statusBarHeight + navbarHeight,
    };
  }, []);

  return (
    <View {...others} style={constainerStyle}>
      {children}
    </View>
  );
}

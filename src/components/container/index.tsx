import React, { useMemo } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { NAVBAR_HEIGHT } from '@/constant';

export default (props: any) => {
  const { style = {}, children, ...others } = props;
  
  const constainerStyle = useMemo(() => {
    const info = Taro.getSystemInfoSync() || {};
    return {
      ...style,
      paddingTop: info.statusBarHeight + NAVBAR_HEIGHT,
    };
  }, []);

  return (
    <View {...others} style={constainerStyle}>
      {children}
    </View>
  );
}

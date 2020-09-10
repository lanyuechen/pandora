import React, { useMemo } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { NAVBAR_HEIGHT_DEFAULT } from '@/constant';

export default (props: any) => {
  const { style = {}, children, ...others } = props;
  
  const constainerStyle = useMemo(() => {
    const info = Taro.getSystemInfoSync() || {};
    const rect = Taro.getMenuButtonBoundingClientRect();
    return {
      ...style,
      paddingTop: rect ? rect.top + rect.bottom - info.statusBarHeight : NAVBAR_HEIGHT_DEFAULT,
    };
  }, []);

  return (
    <View {...others} style={constainerStyle}>
      {children}
    </View>
  );
}

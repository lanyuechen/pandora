import React, { useMemo } from 'react';
import Taro from '@tarojs/taro';
import { AtNavBar } from 'taro-ui';
import { View } from '@tarojs/components';
import { NAVBAR_HEIGHT_DEFAULT } from '@/constant';

export default (props: any) => {
  const { style = {}, ...others } = props;
  
  const containerStyle = useMemo(() => {
    const info = Taro.getSystemInfoSync() || {};
    const rect = Taro.getMenuButtonBoundingClientRect();
    return {
      ...style,
      height: rect ? rect.top + rect.bottom - info.statusBarHeight : NAVBAR_HEIGHT_DEFAULT,
    };
  }, []);

  return (
    <View className="navbar" style={containerStyle}>
      <AtNavBar 
        {...others}
        border={false}
        color="#fff"
      />
    </View>
  );
}

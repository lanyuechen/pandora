import React, { useMemo } from 'react';
import Taro from '@tarojs/taro';
import { AtNavBar } from 'taro-ui';
import { View } from '@tarojs/components';
import { NAVBAR_HEIGHT } from '@/constant';

export default (props: any) => {
  const { style = {}, ...others } = props;
  
  const constainerStyle = useMemo(() => {
    const info = Taro.getSystemInfoSync() || {};
    return {
      ...style,
      paddingTop: info.statusBarHeight,
      height: info.statusBarHeight + NAVBAR_HEIGHT,
    };
  }, []);

  return (
    <View className="navbar" style={constainerStyle}>
      <AtNavBar 
        {...others}
      />
    </View>
  );
}
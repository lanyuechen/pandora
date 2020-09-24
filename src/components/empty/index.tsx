import React from 'react';
import { View, Text } from '@tarojs/components';

import './style.scss';

export default (props: any) => {
  return (
    <View className="empty">
      {/* <Image src={img} /> */}
      <Text className="empty-info">什么都没有</Text>
    </View>
  );
}
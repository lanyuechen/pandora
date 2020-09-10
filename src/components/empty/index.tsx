import React from 'react';
import { View, Text } from '@tarojs/components';

import './style.scss';

// import img from '@/assets/img/panda-1.jpeg';

export default (props: any) => {
  return (
    <View className="empty">
      {/* <Image src={img} /> */}
      <Text className="empty-info">什么都没有</Text>
    </View>
  );
}
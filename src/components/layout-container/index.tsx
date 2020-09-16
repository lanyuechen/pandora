import React from 'react';
import { View } from '@tarojs/components';

export default (props: any) => {
  const { type, gridTemplateColumns, gridTemplateRows, children } = props;
  
  
  return (
    <View
      style={{
        display: type === 'grid' ? 'grid' : 'block',
        gridTemplateColumns,
        gridTemplateRows
      }}
    >
      {children}
    </View>
  )
}

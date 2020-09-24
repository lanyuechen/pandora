import React from 'react';
import { View, Image } from '@tarojs/components';

import PropsForm from './props-form';
import { PropsType } from './data';

const Img = (props: PropsType) => {
  const { src, title } = props;

  return (
    <View>
      <Image
        className="at-article__img"
        src={src} 
        mode="aspectFit" 
        style={{
          width: '100%',
        }}
      />
      <View className="at-article__p" style={{textAlign: 'center'}}>
        {title}
      </View>
    </View>
  )
}

Img.defaultProps = {
  src: '/assets/img/panda-1.jpeg',
  title: '图1 这是一张图片',
}

Img.PropsForm = PropsForm;

export default Img;
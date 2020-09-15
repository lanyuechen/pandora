import React from 'react';
import { Image, Swiper, SwiperItem } from '@tarojs/components';

import img from '@/assets/img/panda-1.jpeg';

import { PropsType, DataType } from './data';

const MySwiper = (props: PropsType) => {
  const { dataSource } = props;

  return (
    <Swiper circular indicatorDots autoplay>
      {dataSource.map((d: DataType, i: number) => (
        <SwiperItem key={i}>
          <Image src={d.url} mode="aspectFill" style={{width: '100%'}} />
        </SwiperItem>
      ))}
    </Swiper>
  )
}

MySwiper.defaultProps = {
  dataSource: [
    { url: img },
    { url: img },
    { url: img },
  ]
}

export default MySwiper;
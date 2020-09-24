import React from 'react';
import { Image, Swiper, SwiperItem } from '@tarojs/components';

import PropsForm from './props-form';

import { PropsType, DataType } from './data';

const MySwiper = (props: PropsType) => {
  const { dataSource, height } = props;

  return (
    <Swiper 
      circular
      indicatorDots
      autoplay
      style={{
        height: `${parseInt(height as string)}px`
      }}
    >
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
    { url: '/assets/img/panda-1.jpeg' },
    { url: '/assets/img/panda-1.jpeg' },
    { url: '/assets/img/panda-1.jpeg' },
  ]
}

MySwiper.PropsForm = PropsForm;

export default MySwiper;
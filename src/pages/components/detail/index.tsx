import React, { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import Navbar from '@/components/navbar';
import Container from '@/components/container';
import Taro, { useRouter } from '@tarojs/taro';
import * as service from '@/services/component';

import Wardrobe from '@/wardrobe';

import { Component } from '../data';

export default () => {
  const [ detail, setDetail ] = useState<Component>();
  const { id = '' } = useRouter().params;

  const getDetail = async () => {
    const res = await service.detail(id);
    if (!res.success) {
      return;
    }
    setDetail(res.data);
  }

  useEffect(() => {
    getDetail();
  }, []);

  if (!detail) {
    return null;
  }

  const C = Wardrobe[detail.component];

  return (
    <Container>
      <Navbar
        onClickLeftIcon={() => Taro.navigateBack()}
        title={detail.name}
        leftText="返回"
        leftIconType="chevron-left"
      />

      <View className="at-article" style={{marginBottom: '15px'}}>
        <View className="at-article__h1">
          {detail.name}
        </View>
        <View className="at-article__content">
          <View className="at-article__info">
            {detail.ut}
          </View>
          <View className="at-article__p">
            {detail.desc}
          </View>
        </View>
      </View>

      <View>
        <C />
      </View>
    </Container>
  )
}

import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { AtFab } from 'taro-ui';
import Navbar from '@/components/navbar';
import Container from '@/components/container';
import Taro, { useRouter } from '@tarojs/taro';
import * as service from '@/services/component';
import { Component } from '../data';

export default () => {
  const [ detail, setDetail ] = useState<Component>();
  const { id } = useRouter().params;

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

      <AtFab className="fab-btn">
        <Text className="at-fab__icon at-icon at-icon-edit" />
      </AtFab>
    </Container>
  )
}

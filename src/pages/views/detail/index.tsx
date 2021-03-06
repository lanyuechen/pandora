import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { AtFab, AtButton, AtList, AtListItem } from 'taro-ui';
import Container from '@/components/container';
import Navbar from '@/components/navbar';
import Taro, { useRouter, useDidShow } from '@tarojs/taro';
import * as service from '@/services/view';
import * as subService from '@/services/component';
import SwipeAction from '@/components/swipe-action';
import { View as ViewItem } from '../data';

export default () => {
  const [ detail, setDetail ] = useState<ViewItem>();
  const { id = '' } = useRouter().params;

  const getDetail = async () => {
    const res = await service.detail(id);
    if (!res.success) {
      return;
    }
    const subsets = res.data.subsets || [];
    const ids = subsets.map(d => d.cid); // todo 可能有重复，但是$in操作影响不大
    const subs = await subService.list({_id: { $in: ids }});
    if (!subs.success) {
      return;
    }
    const dMap = subs.data.reduce((p: any, n: any) => {
      p[n._id] = n;
      return p;
    }, {});
    setDetail({
      ...res.data,
      subsets: subsets.map(d => ({
        ...(dMap[d.cid] || {}),
        ...d,
      })),
    });
  }

  useDidShow(() => {
    getDetail();
  });
  
  const handleRemove = (idx: number) => {
    service.removeSubset(id, idx).then(res => {
      if (res.success) {
        getDetail();
      }
    });
  }

  const toOptimset = (idx: number = -1) => { // idx = -1表示新增，idx > -1表示修改
    Taro.navigateTo({
      url: `/pages/views/config/index?id=${id}&idx=${idx}`
    });
  };

  const toPreview = () => {
    Taro.navigateTo({
      url: `/pages/views/preview/index?id=${id}`
    });
  };

  const toComponentPreview = (idx: number) => {
    Taro.navigateTo({
      url: `/pages/components/preview/index?pid=${id}&idx=${idx}`
    });
  };

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
          <AtButton 
            circle
            size="small" 
            onClick={toPreview} 
            customStyle={{display: 'inline-block', float: 'right'}} 
          >
            预览
          </AtButton>
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

      <AtList>
        {detail.subsets.map((item: any, i: number) => (
          <SwipeAction
            key={i}
            actions={['edit', 'remove']}
            onEditClick={() => toOptimset(i)}
            onRemoveClick={() => handleRemove(i)}
          >
            <AtListItem
              title={item.name || '该组件已被删除，请移除该配置项。'}
              note={item.path}
              arrow="right"
              iconInfo={{ size: 25, color: '#78A4FA', value: 'money' }}
              onClick={() => toComponentPreview(i)}
            />
          </SwipeAction>
        ))}
      </AtList>

      <AtFab className="fab-btn" onClick={() => toOptimset()}>
        <Text className="at-fab__icon at-icon at-icon-add" />
      </AtFab>
    </Container>
  )
}

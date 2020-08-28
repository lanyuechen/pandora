import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { AtFab, AtList, AtListItem, AtNavBar } from 'taro-ui';
import Taro, { useRouter } from '@tarojs/taro';
import * as service from '@/services/project';
import * as subService from '@/services/view';
import SwipeAction from '@/components/swipe-action';
import { Project } from '../data';

export default () => {
  const [ detail, setDetail ] = useState<Project>();
  const { id } = useRouter().params;

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
        ...d,
        meta: dMap[d.cid],
      })),
    });
  }

  useEffect(() => {
    getDetail();
  }, []);
  
  const handleRemove = (idx: number) => {
    service.removeSubset(id, idx).then(res => {
      if (res.success) {
        getDetail();
      }
    });
  }

  if (!detail) {
    return null;
  }

  return (
    <View>
      <AtNavBar
        fixed
        onClickRgIconSt={() => console.log('预留按钮')}
        onClickLeftIcon={() => Taro.navigateBack()}
        title={detail.name}
        leftText="返回"
        leftIconType="chevron-left"
        rightFirstIconType="bullet-list"
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

      <AtList>
        {detail.subsets.map((item: any, i: number) => (
          <SwipeAction
            key={i}
            actions={['remove']}
            onRemoveClick={() => handleRemove(i)}
          >
            <AtListItem
              title={item.meta ? item.meta.name : '该视图已被删除，请移除该配置项。'}
              note={item.path}
              arrow="right"
              iconInfo={{ size: 25, color: '#78A4FA', value: 'iphone' }}
            />
          </SwipeAction>
        ))}
      </AtList>

      <AtFab className="fab-btn">
        <Text className="at-fab__icon at-icon at-icon-edit" />
      </AtFab>
    </View>
  )
}

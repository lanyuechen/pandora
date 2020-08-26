import React, { useEffect, useState, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import { AtFab, AtList, AtListItem, AtSwipeAction, AtNavBar } from 'taro-ui';
import Taro, { useRouter } from '@tarojs/taro';

import { View as ViewItem } from '@/pages/views/data';
import * as service from '@/services/view';
import * as componentService from '@/services/component';

import './index.scss';

export default () => {
  const [ detail, setDetail ] = useState<ViewItem>();
  const { id } = useRouter().params;

  const swipeOption = useMemo(() => [
    {
      text: '',
      style: {
        backgroundColor: '#FF4949',
      },
      className: 'at-icon at-icon-trash'
    }
  ], [])

  const getDetail = async () => {
    const res = await service.detail(id);
    if (!res.success) {
      return;
    }
    const ids = res.data.subsets.map(d => d.cid); // todo 可能有重复，但是$in操作影响不大
    const subsets = await componentService.list({_id: { $in: ids }});
    if (!subsets.success) {
      return;
    }
    const subsetMap = subsets.data.reduce((p: any, n: any) => {
      p[n._id] = n;
      return p;
    }, {});
    setDetail({
      ...res.data,
      subsets: res.data.subsets.map(d => ({
        ...d,
        meta: subsetMap[d.cid],
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
        onClickLeftIcon={() => Taro.redirectTo({url: '/pages/projects'})}
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
          <AtSwipeAction
            autoClose
            key={i}
            options={swipeOption}
            onClick={() => handleRemove(i)}
          >
            <AtListItem
              title={item.meta ? item.meta.name : '该组件已被删除，请移除该配置项。'}
              note="没有描述信息"
              arrow="right"
              iconInfo={{ size: 25, color: '#78A4FA', value: 'money' }}
            />
          </AtSwipeAction>
        ))}
      </AtList>

      <AtFab className="fab-btn">
        <Text className="at-fab__icon at-icon at-icon-edit" />
      </AtFab>
    </View>
  )
}

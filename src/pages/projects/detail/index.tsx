import React, { useEffect, useState, useMemo } from 'react';
import { View } from '@tarojs/components';
import { AtList, AtListItem, AtSwipeAction, AtNavBar } from 'taro-ui';
import Taro, { useRouter } from '@tarojs/taro';

import { Project } from '@/pages/projects/data';
import * as service from '@/services/project';
import * as viewService from '@/services/view';

import './index.scss';

export default () => {
  const [ detail, setDetail ] = useState<Project>();
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
    const ids = res.data.views.map(d => d.id);
    const views = await viewService.list({_id: { $in: ids }});
    if (!views.success) {
      return;
    }
    const viewMap = views.data.reduce((p: any, n: any) => {
      p[n._id] = n;
      return p;
    }, {});
    setDetail({
      ...res.data,
      views: res.data.views.map(d => ({
        ...d,
        meta: viewMap[d.id],
      })),
    });
  }

  useEffect(() => {
    getDetail();
  }, []);
  
  const handleRemove = (_id: string) => {
    service.remove(_id).then(res => {
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
        {detail.views.map((item: any) => (
          <AtSwipeAction
            autoClose
            key={item.id}
            options={swipeOption}
            onClick={() => handleRemove(item._id)}
          >
            <AtListItem
              title={item.meta ? item.meta.name : '该视图已被删除，请移除该配置项。'}
              note={item.path}
              arrow="right"
              iconInfo={{ size: 25, color: '#78A4FA', value: 'iphone' }}
            />
          </AtSwipeAction>
        ))}
      </AtList>
    </View>
  )
}

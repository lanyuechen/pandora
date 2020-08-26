import React, { useEffect, useState, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import { AtFab, AtList, AtListItem, AtSwipeAction, AtNavBar, AtSearchBar } from 'taro-ui';
import Taro, { useDidShow } from '@tarojs/taro';

import * as service from '@/services/view';

import config from './index.config';

import './index.scss';

export default () => {
  const [ list, setList ] = useState([]);
  const [ keywords, setKeywords ] = useState('');

  const swipeOption = useMemo(() => [
    {
      key: 'edit',
      text: '',
      style: {
        backgroundColor: '#6190E8',
      },
      className: 'at-icon at-icon-edit'
    },
    {
      key: 'remove',
      text: '',
      style: {
        backgroundColor: '#FF4949',
      },
      className: 'at-icon at-icon-trash'
    }
  ], [])

  const getList = () => {
    const spec = keywords ? {
      name: { 
        $regex: keywords
      }
    } : {};

    service.list(spec).then((res: any) => {
      if (res.success) {
        setList(res.data);
      }
    });
  }

  useEffect(() => {
    getList();
  }, []);

  useDidShow(() => {
    getList();
  });
  
  const toOptimset = (id?: string) => {
    Taro.navigateTo({
      url: `/pages/views/optimset/index?id=${id || ''}`
    });
  };

  const toDetail = (id: string) => {
    Taro.navigateTo({
      url: `/pages/views/detail/index?id=${id}`
    });
  };

  const handleAction = (option: any, _id: string) => {
    if (option.key === 'edit') {
      toOptimset(_id);
    } else if (option.key === 'remove') {
      service.remove(_id).then(res => {
        if (res.success) {
          getList();
        }
      });
    }
  }

  return (
    <View>
      <AtNavBar
        fixed
        onClickRgIconSt={() => console.log('预留按钮')}
        title={config.navigationBarTitleText}
        rightFirstIconType="bullet-list"
      />

      <AtSearchBar
        value={keywords}
        onChange={(value: string) => setKeywords(value)}
        onActionClick={getList}
      />

      <AtList>
        {list.map((item: any) => (
          <AtSwipeAction
            autoClose
            key={item._id}
            options={swipeOption}
            onClick={(option: any) => handleAction(option, item._id)}
          >
            <AtListItem
              title={item.name}
              note={item.desc}
              arrow="right"
              iconInfo={{ size: 25, color: '#78A4FA', value: 'iphone' }}
              onClick={() => toDetail(item._id)}
            />
          </AtSwipeAction>
        ))}
      </AtList>

      <AtFab className="fab-btn" onClick={() => toOptimset()}>
        <Text className="at-fab__icon at-icon at-icon-add" />
      </AtFab>
    </View>
  )
}

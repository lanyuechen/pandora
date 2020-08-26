import React, { useEffect, useState, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import { AtFab, AtList, AtListItem, AtSwipeAction, AtNavBar, AtSearchBar } from 'taro-ui';
import Taro from '@tarojs/taro';

import * as service from '@/services/view';

import config from './index.config';

import './index.scss';

export default () => {
  const [ list, setList ] = useState([]);
  const [ keywords, setKeywords ] = useState('');

  const swipeOption = useMemo(() => [
    {
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
  
  const toAdd = () => {
    Taro.redirectTo({
      url: '/pages/views/create'
    });
  };

  const toDetail = (id: string) => {
    Taro.redirectTo({
      url: `/pages/views/detail?id=${id}`
    });
  };

  const handleRemove = (_id: string) => {
    service.remove(_id).then(res => {
      if (res.success) {
        getList();
      }
    });
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
            onClick={() => handleRemove(item._id)}
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

      <AtFab className="fab-btn" onClick={toAdd}>
        <Text className="at-fab__icon at-icon at-icon-add" />
      </AtFab>
    </View>
  )
}

import React, { useState } from 'react';
import { Text } from '@tarojs/components';
import { AtFab, AtList, AtListItem, AtSearchBar } from 'taro-ui';
import Taro, { useDidShow } from '@tarojs/taro';
import * as service from '@/services/view';

import SwipeAction from '@/components/swipe-action';
import Navbar from '@/components/navbar';
import Container from '@/components/container';
import Empty from '@/components/empty';

import { View as ViewItem } from './data';

import config from './index.config';

export default () => {
  const [ list, setList ] = useState<ViewItem[]>([]);
  const [ keywords, setKeywords ] = useState('');

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

  const handleRemove = (_id: string) => {
    service.remove(_id).then(res => {
      if (res.success) {
        getList();
      }
    });
  }

  return (
    <Container>
      <Navbar
        title={config.navigationBarTitleText}
      />

      <AtSearchBar
        value={keywords}
        onChange={(value: string) => setKeywords(value)}
        onActionClick={getList}
      />

      {list.length === 0 && <Empty />}

      {list.length > 0 && (
        <AtList>
          {list.map(item => (
            <SwipeAction
              key={item._id}
              actions={['edit', 'remove']}
              onEditClick={() => toOptimset(item._id)}
              onRemoveClick={() => handleRemove(item._id)}
            >
              <AtListItem
                title={item.name}
                note={item.desc}
                arrow="right"
                iconInfo={{ size: 25, color: '#78A4FA', value: 'iphone' }}
                onClick={() => toDetail(item._id)}
              />
            </SwipeAction>
          ))}
        </AtList>
      )}

      <AtFab className="fab-btn bg-color-orange" onClick={() => toOptimset()}>
        <Text className="at-fab__icon at-icon at-icon-add" />
      </AtFab>
    </Container>
  )
}

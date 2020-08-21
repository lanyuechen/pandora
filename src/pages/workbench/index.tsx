import React, { useEffect, useState, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import { AtFab, AtList, AtListItem, AtSwipeAction, AtNavBar } from 'taro-ui';
import Taro from '@tarojs/taro';

import * as projectService from '@/services/project';

import config from './index.config';

import './index.scss';

export default () => {
  const [ list, setList ] = useState([]);

  const swipeOption = useMemo(() => [
    {
      text: '',
      style: {
        backgroundColor: '#FF4949',
      },
      className: 'at-icon at-icon-trash'
    }
  ], [])

  const refresh = () => {
    projectService.list({}).then((res: any) => {
      if (res.success) {
        setList(res.data);
      }
    });
  }

  useEffect(() => {
    refresh();
  }, []);
  
  const toAdd = () => {
    Taro.redirectTo({
      url: '/pages/workbench/create'
    });
  };

  const handleRemove = (_id: string) => {
    projectService.remove(_id).then(res => {
      if (res.success) {
        refresh();
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
              iconInfo={{ size: 25, color: '#78A4FA', value: 'shopping-bag' }}
            />
          </AtSwipeAction>
        ))}
      </AtList>

      <AtFab className="workbench-btn-add" onClick={toAdd}>
        <Text className="at-fab__icon at-icon at-icon-add" />
      </AtFab>
    </View>
  )
}

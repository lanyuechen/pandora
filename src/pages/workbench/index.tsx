import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { AtFab, AtList, AtListItem } from 'taro-ui';
import Taro from '@tarojs/taro';

import * as projectService from '@/services/project';

import './index.scss';

export default () => {
  const [ list, setList ] = useState([]);

  useEffect(() => {
    projectService.list({}).then((res: any) => {
      console.log('>>>>', res)
      if (res.success) {
        setList(res.data);
      }
    });
  }, []);
  
  const toAdd = () => {
    Taro.navigateTo({
      url: '/pages/workbench/create'
    });
  };

  return (
    <View>
      <AtList>
        {list.map((item: any) => (
          <AtListItem
            key={item._id}
            title={item.name}
            note={item.desc}
            arrow="right"
            iconInfo={{ size: 25, color: '#78A4FA', value: 'calendar', }}
          />
        ))}
      </AtList>

      <AtFab className="workbench-btn-add" onClick={toAdd}>
        <Text className="at-fab__icon at-icon at-icon-add" />
      </AtFab>
    </View>
  )
}

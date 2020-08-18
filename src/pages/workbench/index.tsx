import React from 'react';
import { View, Text } from '@tarojs/components';
import { AtFab, AtList, AtListItem } from 'taro-ui';

import './index.scss';

export default () => {
  return (
    <View>
      <AtList>
        <AtListItem
          title="标题文字"
          note="描述信息"
          arrow="right"
          iconInfo={{ size: 25, color: '#78A4FA', value: 'calendar', }}
        />
      </AtList>

      <AtFab className="workbench-btn-add">
        <Text className="at-fab__icon at-icon at-icon-add" />
      </AtFab>
    </View>
  )
}

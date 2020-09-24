import React, { useMemo, useState } from 'react';
import { AtTabBar } from 'taro-ui';
import { View } from '@tarojs/components';
import { useShareAppMessage, useShareTimeline } from '@tarojs/taro';

import ProjectsPage from '@/pages/projects';
import ViewsPage from '@/pages/views';
import ComponentPage from '@/pages/components';

const Index = () => {
  const tabList = useMemo(() => [
    { title: '项目', iconType: 'bookmark', url: '/pages/projects/index'},
    { title: '视图', iconType: 'iphone', url: '/pages/views/index'},
    { title: '组件', iconType: 'money', url: '/pages/components/index'},
  ], []);

  useShareAppMessage(() => ({
    title: '潘多拉的神奇小盒子',
    imageUrl: '/assets/img/panda-1.jpeg'
  }));

  useShareTimeline(() => ({
    title: '潘多拉的神奇小盒子',
    imageUrl: '/assets/img/panda-1.jpeg'
  }));

  const [ current, setCurrent ] = useState(0);

  const handleClick = (idx: number) => {
    setCurrent(idx);
  }

  return (
    <View style={{paddingBottom: 68}}>
      <View style={{display: current === 0 ? 'block' : 'none'}}>
        <ProjectsPage />
      </View>
      <View style={{display: current === 1 ? 'block' : 'none'}}>
        <ViewsPage />
      </View>
      <View style={{display: current === 2 ? 'block' : 'none'}}>
        <ComponentPage />
      </View>

      <AtTabBar
        fixed
        className="tabbar"
        tabList={tabList}
        onClick={handleClick}
        current={current}
      />
    </View>
  )
}

Index.enableShareAppMessage = true;
Index.enableShareTimeline = true;

export default Index;

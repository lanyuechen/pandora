import React, { useState } from 'react';
import Container from '@/components/container';
import Navbar from '@/components/navbar';
import Taro, { useRouter, useDidShow } from '@tarojs/taro';
import { View } from '@tarojs/components';
import * as service from '@/services/view';
import * as ComponentService from '@/services/component';

import Wardrobe from '@/wardrobe';

export default () => {
  const { id = '', idx = -1 } = useRouter().params;
  const [ detail, setDetail ] = useState<any>();

  const getDetail = async () => {
    const view = await service.detail(id);
    if (!view.success) {
      return;
    }

    const cfg = view.data.subsets[idx];

    const component = await ComponentService.detail(cfg.cid);
    if (!component.success) {
      return;
    }

    setDetail({
      ...cfg,
      meta: component.data
    });
  }

  useDidShow(() => {
    getDetail();
  });

  if (!detail) {
    return null;
  }

  const C = Wardrobe[detail.meta.component];

  return (
    <Container>
      <Navbar
        onClickLeftIcon={() => Taro.navigateBack()}
        title="组件预览"
        leftText="返回"
        leftIconType="chevron-left"
      />

      <View>
        <C {...(detail.props || {})} />
      </View>

    </Container>
  )
}

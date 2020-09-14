import React, { useState } from 'react';
import Container from '@/components/container';
import Navbar from '@/components/navbar';
import Taro, { useRouter, useDidShow } from '@tarojs/taro';
import { View } from '@tarojs/components';
import * as service from '@/services/project';
import * as ViewService from '@/services/view';
import * as ComponentService from '@/services/component';

export default () => {
  const { id = '', idx = -1 } = useRouter().params;
  const [ detail, setDetail ] = useState<any>();

  const getDetail = async () => {
    const prj = await service.detail(id);
    if (!prj.success) {
      return;
    }
    const cfg = prj.data.subsets[idx];
    const view = await ViewService.detail(cfg.cid);
    if (!view.success) {
      return;
    }

    const ids = view.data.subsets.map(d => d.cid); // todo 可能有重复，但是$in操作影响不大
    const subs = await ComponentService.list({_id: { $in: ids }});
    if (!subs.success) {
      return;
    }
    const dMap = subs.data.reduce((p: any, n: any) => {
      p[n._id] = n;
      return p;
    }, {});

    setDetail({
      ...cfg,
      meta: view.data,
      subsets: view.data.subsets.map(d => ({
        ...d,
        meta: dMap[d.cid],
      })),
    });

  }

  useDidShow(() => {
    getDetail();
  });

  if (!detail) {
    return null;
  }

  return (
    <Container>
      <Navbar
        onClickLeftIcon={() => Taro.navigateBack()}
        title="视图预览"
        leftText="返回"
        leftIconType="chevron-left"
      />

      视图预览
      {detail.subsets.map((d: any) => (
        <View key={d.meta._id}>{d.meta.name}</View>
      ))}
      
    </Container>
  )
}
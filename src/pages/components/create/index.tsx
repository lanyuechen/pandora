import React, { useState } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtForm, AtInput, AtButton, AtNavBar } from 'taro-ui';
import * as service from '@/services/component';
import config from './index.config';

import { Component } from '../data.d';

export default () => {
  const [ formData, setFormData ] = useState<Component>({} as Component);
  
  const submit = () => {
    service.create(formData).then((res: any) => {
      if (res.success) {
        Taro.navigateBack();
      }
    })
  }

  const handleChange = (key: string, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  }

  return (
    <View>
      <AtNavBar
        fixed
        onClickRgIconSt={() => console.log('预留按钮')}
        onClickLeftIcon={() => Taro.navigateBack()}
        title={config.navigationBarTitleText}
        leftText="返回"
        leftIconType="chevron-left"
        rightFirstIconType="bullet-list"
      />

      <AtForm>
        <AtInput 
          name="name" 
          title="名称" 
          value={formData.name}
          placeholder="请输入组件名称" 
          onChange={(value) => handleChange('name', value)} 
        />
        <AtInput
          name="desc"
          title="简介"
          value={formData.desc}
          placeholder="请输入组件简介"
          onChange={(value) => handleChange('desc', value)}
        />
        <AtButton full type="primary" onClick={submit}>提交</AtButton>
      </AtForm>
    </View>
  )
}

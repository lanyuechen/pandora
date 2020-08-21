import React, { useState } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtForm, AtInput, AtButton, AtNavBar } from 'taro-ui';
import * as projectService from '@/services/project';
import config from './index.config';

import { Project } from '../data.d';

export default () => {
  const [ formData, setFormData ] = useState<Project>({} as Project);
  
  const submit = () => {
    projectService.create(formData).then((res: any) => {
      if (res.success) {
        Taro.redirectTo({
          url: '/pages/workbench'
        });
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
        onClickLeftIcon={() => Taro.redirectTo({url: '/pages/workbench'})}
        title={config.navigationBarTitleText}
        leftText="返回"
        leftIconType="chevron-left"
        rightFirstIconType="bullet-list"
      />

      <AtForm onSubmit={submit}>
        <AtInput 
          name="name" 
          title="名称" 
          value={formData.name}
          placeholder="请输入项目名称" 
          onChange={(value) => handleChange('name', value)} 
        />
        <AtInput
          name="desc"
          title="简介"
          value={formData.desc}
          placeholder="请输入项目简介"
          onChange={(value) => handleChange('desc', value)}
        />
        <AtButton full formType="submit" type="primary">提交</AtButton>
      </AtForm>
    </View>
  )
}

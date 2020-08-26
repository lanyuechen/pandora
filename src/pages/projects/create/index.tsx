import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtForm, AtInput, AtButton, AtNavBar } from 'taro-ui';
import * as service from '@/services/project';
import * as viewService from '@/services/view';
import DynamicForm from '@/components/dynamic-form';
import config from './index.config';

import { Project } from '../data.d';

export default () => {
  const [ formData, setFormData ] = useState<Project>({} as Project);
  const [ viewOptions, setViewOptions ] = useState([]);

  useEffect(() => {
    viewService.list({}).then(res => {
      if (res.success) {
        setViewOptions(res.data.map((d: any) => ({
          key: d._id,
          value: d.name,
        })));
      }
    })
  }, []);
  
  const submit = () => {
    service.create(formData).then((res: any) => {
      if (res.success) {
        Taro.redirectTo({
          url: '/pages/projects'
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
        onClickLeftIcon={() => Taro.redirectTo({url: '/pages/projects'})}
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
        
        <DynamicForm
          config={[
            {
              type: 'select',
              key: 'vid',
              title: '选择视图',
              placeholder: '请选择视图',
              options: viewOptions,
            },
            {
              key: 'path',
              title: '视图路径',
              placeholder: '请输入视图路径'
            },
          ]}
          value={formData.views}
          onChange={(value: any) => handleChange('views', value)}
        />

        <AtButton full formType="submit" type="primary">提交</AtButton>
      </AtForm>
    </View>
  )
}

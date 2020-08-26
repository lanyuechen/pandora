import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtForm, AtInput, AtButton, AtNavBar } from 'taro-ui';
import * as service from '@/services/view';
import * as componentService from '@/services/component';
import DynamicForm from '@/components/dynamic-form';
import config from './index.config';
import { View as ViewItem } from '../data.d';

export default () => {
  const [ formData, setFormData ] = useState<ViewItem>({} as ViewItem);
  const [ componentOptions, setComponentOptions ] = useState<any>([]);

  useEffect(() => {
    componentService.list({}).then(res => {
      if (res.success) {
        setComponentOptions(res.data.map((d: any) => ({
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
          url: '/pages/views'
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
        onClickLeftIcon={() => Taro.redirectTo({url: '/pages/views'})}
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
          placeholder="请输入视图名称" 
          onChange={(value) => handleChange('name', value)} 
        />
        <AtInput
          name="desc"
          title="简介"
          value={formData.desc}
          placeholder="请输入视图简介"
          onChange={(value) => handleChange('desc', value)}
        />

        <DynamicForm
          config={[
            {
              type: 'select',
              key: 'cid',
              title: '选择组件',
              placeholder: '请选择组件',
              options: componentOptions,
            },
          ]}
          value={formData.components}
          onChange={(value: any) => handleChange('components', value)}
        />

        <AtButton full formType="submit" type="primary">提交</AtButton>
      </AtForm>
    </View>
  )
}

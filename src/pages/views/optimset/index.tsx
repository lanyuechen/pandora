import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { AtForm, AtInput, AtButton, AtNavBar } from 'taro-ui';
import * as service from '@/services/view';
import * as componentService from '@/services/component';
import DynamicForm from '@/components/dynamic-form';
import { View as ViewItem } from '../data.d';

export default () => {
  const [ formData, setFormData ] = useState<ViewItem>({} as ViewItem);
  const [ componentOptions, setComponentOptions ] = useState<any>([]);
  const { id } = useRouter().params;

  const init = async () => {
    const options = await componentService.list({});
    if (options.success) {
      setComponentOptions(options.data.map((d: any) => ({
        key: d._id,
        value: d.name,
      })));
    }
    if (id) {
      const detail = await service.detail(id);
      if (detail.success) {
        setFormData(detail.data);
      }
    }
  }

  useEffect(() => {
    init();
  }, []);

  const submit = async () => {
    let res;
    if (id) {
      res = await service.update(id, formData);
    } else {
      res = await service.create(formData);
    }
    if (res.success) {
      Taro.redirectTo({
        url: '/pages/views'
      });
    }
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
        title={id ? '编辑视图' : '创建视图'}
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
          value={formData.subsets || []}
          onChange={(value: any) => handleChange('subsets', value)}
        />

        <AtButton full formType="submit" type="primary">提交</AtButton>
      </AtForm>
    </View>
  )
}

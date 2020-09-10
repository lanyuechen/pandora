import React, { useState, useEffect } from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { AtForm, AtInput, AtButton } from 'taro-ui';
import Container from '@/components/container';
import Navbar from '@/components/navbar';
import * as service from '@/services/view';
import * as subService from '@/services/component';
import DynamicForm from '@/components/dynamic-form';

import { View as ViewItem } from '../data.d';

export default () => {
  const [ formData, setFormData ] = useState<ViewItem>({} as ViewItem);
  const [ pickerOptions, setPickerOptions ] = useState<any>([]);
  const { id } = useRouter().params;

  const init = async () => {
    const options = await subService.list({});
    if (options.success) {
      setPickerOptions(options.data.map((d: any) => ({
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
      Taro.navigateBack();
    }
  }

  const handleChange = (key: string, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  }

  return (
    <Container>
      <Navbar
        onClickLeftIcon={() => Taro.navigateBack()}
        title={id ? '编辑项目' : '创建项目'}
        leftText="返回"
        leftIconType="chevron-left"
      />

      <AtForm>
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
              key: 'cid',
              title: '选择组件',
              placeholder: '请选择组件',
              options: pickerOptions,
            }
          ]}
          value={formData.subsets || []}
          onChange={(value: any) => handleChange('subsets', value)}
        />

        <AtButton full type="primary" onClick={submit}>提交</AtButton>
      </AtForm>
    </Container>
  )
}

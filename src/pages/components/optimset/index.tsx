import React, { useState, useEffect } from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { AtForm, AtInput, AtButton } from 'taro-ui';
import Navbar from '@/components/navbar';
import Container from '@/components/container';
import Picker from '@/components/picker';
import * as service from '@/services/component';

import Wardrobe from '@/wardrobe';

import { Component } from '../data.d';

const wardrobeOptions = Object.keys(Wardrobe);

export default () => {
  const [ formData, setFormData ] = useState<Component>({} as Component);
  const { id } = useRouter().params;

  const init = async () => {
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

  const PropsForm = Wardrobe[formData.component] && Wardrobe[formData.component].PropsForm;

  return (
    <Container>
      <Navbar
        onClickLeftIcon={() => Taro.navigateBack()}
        title={id ? '编辑组件' : '创建组件'}
        leftText="返回"
        leftIconType="chevron-left"
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

        <Picker
          title="选择组件"
          value={formData.component}
          options={wardrobeOptions}
          onChange={(value) => handleChange('component', value)}
        />

        {PropsForm && <PropsForm value={formData.props} onChange={(value: any) => handleChange('props', value)} />}
        
        <AtButton full type="primary" onClick={submit}>提交</AtButton>
      </AtForm>
    </Container>
  )
}

import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { AtForm, AtInput, AtButton, AtNavBar } from 'taro-ui';
import * as service from '@/services/project';
import * as subService from '@/services/view';
import DynamicForm from '@/components/dynamic-form';

import { Project } from '../data.d';

export default () => {
  const [ formData, setFormData ] = useState<Project>({} as Project);
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
    <View>
      <AtNavBar
        fixed
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
              title: '选择视图',
              placeholder: '请选择视图',
              options: pickerOptions,
            },
            {
              key: 'path',
              title: '视图路径',
              placeholder: '请输入视图路径'
            },
          ]}
          value={formData.subsets || []}
          onChange={(value: any) => handleChange('subsets', value)}
        />

        <AtButton full type="primary" onClick={submit}>提交</AtButton>
      </AtForm>
    </View>
  )
}

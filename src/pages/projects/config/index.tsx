import React, { useState, useEffect } from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { AtForm, AtInput, AtButton } from 'taro-ui';
import Navbar from '@/components/navbar';
import Container from '@/components/container';
import Picker from '@/components/picker';
import * as service from '@/services/project';
import * as subService from '@/services/view';

import { SubsetConfig } from '../data.d';

const layoutOptions = [
  {key: 'auto', value: '自动布局'},
  {key: 'flow', value: '流式布局'},
  {key: 'grid', value: '网格布局'},
]

export default () => {
  const [ formData, setFormData ] = useState<SubsetConfig>({} as SubsetConfig);
  const [ pickerOptions, setPickerOptions ] = useState<any>([]);
  const { id = '', idx: _idx = '-1' } = useRouter().params;
  const idx = parseInt(_idx);

  const init = async () => {
    const options = await subService.list({});
    if (options.success) {
      setPickerOptions(options.data.map((d: any) => ({
        key: d._id,
        value: d.name,
      })));
    }
    if (idx > -1) {
      const detail = await service.detail(id);
      if (detail.success) {
        setFormData(detail.data.subsets[idx]);
      }
    }
  }

  useEffect(() => {
    init();
  }, []);
  
  const submit = async () => {
    let res;
    if (idx > -1) {
      res = await service.updateSubset(id, idx, formData);
    } else {
      res = await service.addSubset(id, formData);
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
        title={idx > -1 ? '配置视图' : '添加视图'}
        leftText="返回"
        leftIconType="chevron-left"
      />

      <AtForm>
        <Picker
          title="选择视图"
          options={pickerOptions}
          value={formData.cid}
          onChange={(val: string) => handleChange('cid', val)}
        />

        <AtInput 
          name="path" 
          title="访问路径" 
          value={formData.path}
          placeholder="请输入访问路径" 
          onChange={(value) => handleChange('path', value)} 
        />

        <Picker
          title="选择布局"
          options={layoutOptions}
          value={formData.layout}
          onChange={(val: string) => handleChange('layout', val)}
        />

        <AtButton full type="primary" onClick={submit}>提交</AtButton>
      </AtForm>
    </Container>
  )
}

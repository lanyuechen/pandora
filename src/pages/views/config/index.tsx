import React, { useState, useEffect } from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { AtForm, AtButton } from 'taro-ui';
import Navbar from '@/components/navbar';
import Container from '@/components/container';
import Picker from '@/components/picker';
import * as service from '@/services/view';
import * as subService from '@/services/component';

import Wardrobe from '@/wardrobe';

import { SubsetConfig } from '../data.d';

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
        component: d.component,
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

  let PropsForm;
  const option = pickerOptions.find((d: any) => d.key === formData.cid);
  if (option) {
    PropsForm = Wardrobe[option.component].PropsForm;
  }
  
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
        title={idx > -1 ? '配置组件' : '添加组件'}
        leftText="返回"
        leftIconType="chevron-left"
      />

      <AtForm>
        <Picker
          title="选择组件"
          options={pickerOptions}
          value={formData.cid}
          onChange={(val: string) => handleChange('cid', val)}
        />

        {PropsForm && <PropsForm value={formData.props} onChange={(value: any) => handleChange('props', value)} />}

        <AtButton full type="primary" onClick={submit}>提交</AtButton>
      </AtForm>
    </Container>
  )
}

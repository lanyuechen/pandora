import React, { useState, useEffect } from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { AtForm, AtInput, AtButton, AtList, AtListItem } from 'taro-ui';
import { Picker } from '@tarojs/components';
import Navbar from '@/components/navbar';
import Container from '@/components/container';
import * as service from '@/services/project';
import * as subService from '@/services/view';

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

  const pickedIdx = formData.cid ? pickerOptions.findIndex((d: any) => formData.cid === d.key) : 0;
  const pickedName = formData.cid ? pickerOptions[pickedIdx].value : '';

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
          mode="selector"
          range={pickerOptions}
          value={pickedIdx}
          rangeKey="value"
          onChange={(e) => handleChange('cid', pickerOptions[e.detail.value as number].key)}
        >
          <AtList>
            <AtListItem
              title="选择视图"
              extraText={pickedName}
            />
          </AtList>
        </Picker>

        <AtInput 
          name="path" 
          title="访问路径" 
          value={formData.path}
          placeholder="请输入访问路径" 
          onChange={(value) => handleChange('path', value)} 
        />

        <AtButton full type="primary" onClick={submit}>提交</AtButton>
      </AtForm>
    </Container>
  )
}

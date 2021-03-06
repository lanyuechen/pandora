import React from 'react';
import { AtImagePicker, AtInput } from 'taro-ui';
import { PropsFormPropsType } from '@/wardrobe/props-form.data';

export default (props: PropsFormPropsType) => {
  const { onChange, value = {} } = props;

  const handleChange = (key: string, val: any) => {
    onChange({
      ...value,
      [key]: val,
    });
  }

  return (
    <>
      <AtInput 
        name="height"
        title="轮播图高度" 
        value={value.height}
        onChange={(val) => handleChange('height', val)} 
      />

      <AtImagePicker
        mode="aspectFill"
        files={value.dataSource || []}
        onChange={(files: any) => handleChange('dataSource', files)}
      />
    </>
  )
}
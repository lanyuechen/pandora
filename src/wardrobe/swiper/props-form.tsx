import React from 'react';
import { AtImagePicker } from 'taro-ui';
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
      <AtImagePicker
        files={value.dataSource || []}
        onChange={(files: any) => handleChange('dataSource', files)}
      />
    </>
  )
}
import React from 'react';
import { AtImagePicker } from 'taro-ui';

export default (props: any) => {
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
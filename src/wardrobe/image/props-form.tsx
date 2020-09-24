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
        name="title"
        title="图片标题" 
        value={value.title}
        onChange={(val) => handleChange('title', val)} 
      />
      <AtImagePicker
        mode="aspectFill"
        files={value.src ? [{url: value.src}] : []}
        onChange={(files: any) => handleChange('src', files[0].url)}
      />
    </>
  )
}
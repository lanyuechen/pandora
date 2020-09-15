import React from 'react';
import { AtInput } from 'taro-ui';
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
        name="text" 
        title="段落内容" 
        value={value.text}
        placeholder="请输入段落内容" 
        onChange={(val) => handleChange('text', val)} 
      />
    </>
  )
}
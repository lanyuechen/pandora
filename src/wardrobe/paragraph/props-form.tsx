import React from 'react';
import { AtInput } from 'taro-ui';

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
      <AtInput 
        name="text" 
        title="段落文本" 
        value={value.text}
        placeholder="请输入段落内容" 
        onChange={(val) => handleChange('text', val)} 
      />
    </>
  )
}
import React from 'react';
import { AtInput } from 'taro-ui';
import Picker from '@/components/picker';

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
        title="标题内容" 
        value={value.text}
        placeholder="请输入标题内容" 
        onChange={(val) => handleChange('text', val)} 
      />

      <Picker 
        title="显示级别" 
        value={value.level}
        options={['1', '2', '3']}
        onChange={(val) => handleChange('level', val)} 
      />
    </>
  )
}
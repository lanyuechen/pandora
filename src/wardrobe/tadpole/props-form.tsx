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
        name="height"
        title="组件高度" 
        value={value.height}
        onChange={(val) => handleChange('height', parseInt(val as string))} 
      />
    </>
  )
}
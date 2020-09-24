import React from 'react';
import { AtInput } from 'taro-ui';
import Picker from '@/components/picker';
import { LAYOUT_OPTIONS } from '@/constant';

export default (props: any) => {
  const { onChange, value } = props;

  return (
    <>
      <Picker
        title="选择布局"
        options={LAYOUT_OPTIONS}
        value={value.layout}
        onChange={(val: string) => onChange('layout', val)}
      />

      {value.layout === 'grid' && (
        <>
          <AtInput
            name="gridTemplateColumns"
            title="列配置" 
            value={value.gridTemplateColumns}
            placeholder="请输入网格列配置" 
            onChange={(val) => onChange('gridTemplateColumns', val)} 
          />

          <AtInput
            name="gridTemplateRows"
            title="行配置" 
            value={value.gridTemplateRows}
            placeholder="请输入网格行配置" 
            onChange={(val) => onChange('gridTemplateRows', val)} 
          />
        </>
      )}
    </>
  )
}

import React from 'react';
import { AtList, AtListItem } from 'taro-ui';
import { Picker } from '@tarojs/components';

export default (props: any) => {
  const { options, value, onChange, title } = props;

  const idx = options.findIndex((d: any) => d.key === value);
  const name = idx > -1 ? options[idx].value : '';

  return (
    <Picker
      mode="selector"
      range={options}
      value={idx}
      rangeKey="value"
      onChange={(e) => onChange(options[e.detail.value as number].key)}
    >
      <AtList hasBorder={false}>
        <AtListItem
          title={title}
          extraText={name}
        />
      </AtList>
    </Picker>
  )
}

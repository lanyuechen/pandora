import React from 'react';
import { AtList, AtListItem } from 'taro-ui';
import { Picker } from '@tarojs/components';

import { PropsType, OptionType } from './data';

export default (props: PropsType) => {
  const { options, value, title, onChange } = props;

  const parsedOptions: OptionType[] = (options as Array<OptionType | string>).map((o: OptionType | string) => {
    if (typeof o === 'string') {
      return {key: o, value: o};
    }
    return o;
  })

  const idx = parsedOptions.findIndex((d: OptionType) => d.key === value);
  const name = idx > -1 ? parsedOptions[idx].value : '';

  return (
    <Picker
      mode="selector"
      range={parsedOptions}
      value={idx}
      rangeKey="value"
      onChange={(e) => onChange(parsedOptions[e.detail.value as number].key)}
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

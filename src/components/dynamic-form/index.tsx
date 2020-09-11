import React from 'react';
import { View, Picker } from '@tarojs/components';
import { AtButton, AtInput, AtList, AtListItem } from 'taro-ui';
import SwipeAction from '@/components/swipe-action';

import { PropType } from './data';

export default (props: PropType) => {
  const { config, value = [], onChange } = props;

  const handleAdd = () => {
    onChange(value.concat({}));
  }

  const handleChange = (idx: number, key: string, val: any) => {
    onChange(value.map((d, i: number) => {
      if (idx === i) {
        return {
          ...d,
          [key]: val,
        }
      }
      return d;
    }));
  }

  const handleRemove = (idx: number) => {
    onChange(value.filter((d, i: number) => i !== idx));
  }

  return (
    <View>
      {value.map((d, i: number) => (
        <SwipeAction
          key={i}
          actions={['remove']}
          onRemoveClick={() => handleRemove(i)}
        >
          <View>
            {config.map((c, j: number) => {
              if (c.type === 'select') {
                const options = c.options || [];
                const idx = d[c.key] ? options.findIndex(o => o.key === d[c.key]) : 0;
                return (
                  <Picker
                    key={j}
                    mode="selector"
                    range={options}
                    value={idx}
                    rangeKey="value"
                    onChange={(e) => handleChange(i, c.key, options[e.detail.value as number].key)}
                  >
                    <AtList>
                      <AtListItem
                        title={c.title}
                        extraText={d[c.key] ? options[idx].value : ''}
                      />
                    </AtList>
                  </Picker>
                )
              }
              return (
                <AtInput
                  key={j}
                  name={c.key} 
                  title={c.title} 
                  value={d[c.key]}
                  placeholder={c.placeholder} 
                  onChange={(v) => handleChange(i, c.key, v)} 
                />
              );
            })}
          </View>
        </SwipeAction>
      ))}
      <AtButton type="secondary" className="dashed" onClick={handleAdd}>
        <View className="at-icon at-icon-add" />
      </AtButton>
    </View>
  )
}
import React from 'react';
import { View } from '@tarojs/components';
import { AtButton, AtInput } from 'taro-ui';
import SwipeAction from '@/components/swipe-action';
import Picker from '@/components/picker';

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
                return (
                  <Picker
                    key={j}
                    title={c.title}
                    options={c.options || []}
                    value={d[c.key]}
                    onChange={(val: string) => handleChange(i, c.key, val)}
                  />
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
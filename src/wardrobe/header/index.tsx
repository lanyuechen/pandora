import React from 'react';
import { View } from '@tarojs/components';

import PropsForm from './props-form';
import { PropsType } from './data';

const Paragraph = (props: PropsType) => {
  const { text, level } = props;

  return (
    <View className={`at-article__h${level}`}>
      {text}
    </View>
  )
}

Paragraph.defaultProps = {
  text: '这是一个标题',
  level: '1',
}

Paragraph.PropsForm = PropsForm;

export default Paragraph;
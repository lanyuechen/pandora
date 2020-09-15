import React from 'react';
import { View } from '@tarojs/components';

import PropsForm from './props-form';
import { PropsType } from './data';

const Paragraph = (props: PropsType) => {
  const { text } = props;

  return (
    <View className="at-article__p">
      {text}
    </View>
  )
}

Paragraph.defaultProps = {
  text: '打南边来了一个喇嘛，手里提着五斤鳎(tǎ)蚂，打北边来了一个哑巴，腰里别着一个喇叭。提搂鳎蚂的喇嘛要拿鳎蚂去换别着喇叭的哑巴的喇叭，别着喇叭的哑巴不愿意拿喇叭去换提搂鳎蚂的喇嘛的鳎蚂。'
}

Paragraph.PropsForm = PropsForm;

export default Paragraph;
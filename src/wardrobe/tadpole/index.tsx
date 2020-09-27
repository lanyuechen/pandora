import React, { useState, useEffect } from 'react';
import { View, Canvas } from '@tarojs/components';
import Taro from '@tarojs/taro';

import Pond from './lib/pond';
import PropsForm from './props-form';
import { PropsType } from './data';

const Tadpole = (props: PropsType) => {
  const { height } = props;
  const [ pond, setPond ] = useState<Pond>();

  useEffect(() => {
    Taro.nextTick(() => {
      Taro.createSelectorQuery().select('#canvas').fields({ node: true, size: true }).exec((res) => {
        const canvas = res[0].node;

        const info = Taro.getSystemInfoSync();
        
        canvas.width = info.windowWidth;
        canvas.height = height || info.windowWidth * 2 / 3;

        const myPond = new Pond(canvas);
        setPond(myPond);
        myPond.run();
      });
    });
  }, []);

  const handleTouchStart = (e: any) => {
    pond && pond.touchstart(e)
  }

  const handleTouchEnd = (e: any) => {
    pond && pond.touchend(e)
  }

  const handleTouchMove = (e: any) => {
    pond && pond.touchmove(e)
  }

  return (
    <View>
      <Canvas
        type="2d"
        id="canvas"
        style={{
          width: pond && pond.canvas.width,
          height: pond && pond.canvas.height
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onTouchMove={handleTouchMove}
      />
    </View>
  )
}

Tadpole.PropsForm = PropsForm;

export default Tadpole;
import React, { useState, useEffect } from 'react';
import { View, Canvas } from '@tarojs/components';
import Taro from '@tarojs/taro';

import App from './app';

export default () => {
  const [ pond, setPond ] = useState<App>();

  useEffect(() => {
    Taro.nextTick(() => {
      Taro.createSelectorQuery().select('#canvas').fields({ node: true, size: true }).exec((res) => {
        const canvas = res[0].node;

        const info = Taro.getSystemInfoSync();
        
        canvas.width = info.windowWidth;
        canvas.height = info.windowWidth * 2 / 3;

        const app = new App(canvas);
        setPond(app);
        app.run();
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
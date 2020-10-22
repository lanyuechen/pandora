import React, { useEffect, useMemo } from 'react';
import { Canvas } from '@tarojs/components';
import Taro from '@tarojs/taro';

import F2 from '@antv/f2';

export default (props: any) => {
  const sysInfo = useMemo(() => Taro.getSystemInfoSync(), []);

  const draw = (chart: F2.Chart) => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];
    
    // Step 2: 载入数据源
    chart.source(data);

    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart.interval().position('genre*sold').color('genre');

    // Step 4: 渲染图表
    chart.render();
  }

  useEffect(() => {
    Taro.nextTick(() => {
      Taro.createSelectorQuery().select('#canvas').fields({ node: true, size: true }).exec((res) => {
        const canvas = res[0].node;
        canvas.width = sysInfo.windowWidth;
        canvas.height = sysInfo.windowWidth / 2;

        // Step 1: 创建 Chart 对象
        const chart = new F2.Chart({
          context: canvas.getContext('2d'),
          width: sysInfo.windowWidth,
          height: sysInfo.windowWidth / 2,
        });

        draw(chart);
      });
    });
  }, []);

  return (
    <Canvas
      type="2d"
      id="canvas"
      style={{
        width: sysInfo.windowWidth,
        height: sysInfo.windowWidth / 2,
      }}
    />
  );
}

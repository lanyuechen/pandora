import React, { useEffect, useMemo, useState } from 'react';
import { Canvas } from '@tarojs/components';
import Taro from '@tarojs/taro';

import F2 from '@antv/f2';
import { PropType } from './data';

const Chart = (props: PropType) => {
  const { dataSource, draw } = props;

  const [ chart, setChart ] = useState<F2.Chart | undefined>();
  const sysInfo = useMemo(() => Taro.getSystemInfoSync(), []);
  const width = sysInfo.windowWidth;
  const height = width / 2;

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (chart) {
      chart.changeData(dataSource);
    }
  }, [dataSource]);

  const getCanvas = () => {
    return new Promise<any>((resolve) => {
      Taro.nextTick(() => {
        Taro.createSelectorQuery().select('#canvas').fields({ node: true, size: true }).exec((res) => {
          resolve(res[0].node)
        });
      });
    });
  }

  const init = async () => {
    const canvas = await getCanvas();
    canvas.width = width * sysInfo.pixelRatio;
    canvas.height = height * sysInfo.pixelRatio;

    // Step 1: 创建 Chart 对象
    const f2Chart = new F2.Chart({
      context: canvas.getContext('2d'),
      width,
      height,
      pixelRatio: sysInfo.pixelRatio,
    });

    // Step 2: 载入数据源
    f2Chart.source(dataSource);

    // Step 3: 绘制图表
    draw(f2Chart);

    // Step 4: 渲染图表
    f2Chart.render();

    setChart(f2Chart);
  }

  return (
    <Canvas
      type="2d"
      id="canvas"
      style={{ width, height }}
    />
  );
}

Chart.defaultProps = {
  dataSource: []
}

export default Chart;

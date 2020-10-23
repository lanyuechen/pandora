import React, { useState } from 'react';
import { View } from '@tarojs/components';
import { AtButton, AtInput } from 'taro-ui';
import Chart from '@/components/chart';
import F2 from '@antv/f2';
import * as calculator from './calculator';

const LoanCalc = () => {
  const [ a, setA ] = useState<number>(100);
  const [ I, setI ] = useState<number>(4.9);
  const [ n, setN ] = useState<number>(30);
  const [ data, setData ] = useState<any[]>([]);

  const calc = () => {
    const b = calculator.totalByMonth(a * 10000, I / 100, n * 12);

    const tmpData = [];
    for (let i = 0; i < n * 12; i++) {
      const interest = calculator.interestByMonth(a * 10000, I / 100, i + 1, b);
      tmpData.push({
        month: `${i + 1}月`,
        value: interest,
        type: '利息'
      });
      tmpData.push({
        month: `${i + 1}月`,
        value: b - interest,
        type: '本金'
      });
    }

    setData(tmpData);
  }

  const draw = (chart: F2.Chart) => {
    chart.scale('month', {
      type: 'cat',
      tickCount: 5
    });
    chart.scale('value', {
      tickCount: 5
    });
    chart.axis('month', {
      label: (text, index, total) => {
        // 只显示每一年的第一天
        const textCfg: any = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart.tooltip({
      custom: true,
      showXTip: true,
      showYTip: true,
      snap: true,
      crosshairsType: 'xy',
      crosshairsStyle: {
        lineDash: [ 2 ]
      }
    });
    chart.area().position('month*value').color('type').adjust('stack');
    chart.line().position('month*value').color('type').adjust('stack');
  }

  return (
    <View>
      <AtInput 
        name="amount"
        title="贷款金额(万)"
        value={a + ''}
        onChange={(val) => setA(val as number)} 
      />
      <AtInput 
        name="intrestRate"
        title="贷款利率(%)"
        value={I + ''}
        onChange={(val) => setI(val as number)} 
      />
      <AtInput 
        name="date"
        title="贷款年限(年)"
        value={n + ''}
        onChange={(val) => setN(val as number)} 
      />
      
      <AtButton full type="primary" onClick={calc}>计算</AtButton>

      <View>
        <Chart dataSource={data} draw={draw} />
      </View>
    </View>
  )
}

export default LoanCalc;
import React, { useState } from 'react';
import { View } from '@tarojs/components';
import { AtButton, AtInput } from 'taro-ui';
import Chart from '@/components/chart';
import * as calculator from './calculator';

const LoanCalc = () => {
  const [ a, setA ] = useState<number>(100);
  const [ I, setI ] = useState<number>(4.9);
  const [ n, setN ] = useState<number>(30);
  const [ b, setB ] = useState<number>(0);
  const [ c, setC ] = useState<number>(0);

  const calc = () => {
    setB(calculator.totalByMonth(a * 10000, I / 100, n * 12));
    setC(calculator.interestByMonth(a * 10000, I / 100, 1, b));
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

      <View>每月还款金额(元)：{b.toFixed(2)}</View>
      <View>首月还款利息(元)：{c.toFixed(2)}</View>

      <View>
        <Chart />
      </View>
    </View>
  )
}

export default LoanCalc;
import F2 from '@antv/f2';

export interface PropType {
  dataSource: any[];
  draw: (chart: F2.Chart) => void;
}

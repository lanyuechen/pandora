export interface SubsetConfig {
  cid: string;    // 组件id
}

export interface Config {
  [foo: string]: string;
}

export interface CreateParams {
  name: string;                     // 视图名
  desc: string;                     // 视图简介
  config: Config;                   // 视图配置
  subsets: SubsetConfig[];          // 子集(组件)配置列表
}

export interface View extends CreateParams {
  _id: string;    // 视图id
  ct: string;     // 视图创建时间
  ut: string;     // 视图更新时间
}

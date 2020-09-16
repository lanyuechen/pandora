export interface Config {
  props?: any;
}

export interface CreateParams extends Config {
  name: string;             // 组件名
  desc: string;             // 组件简介
  component: string;        // 组件类型（react组件名称）
}

export interface Component extends CreateParams {
  _id: string;    // 组件id
  ct: string;     // 组件创建时间
  ut: string;     // 组件更新时间
}

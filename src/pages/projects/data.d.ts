export interface ViewConfig {
  id: string;     // 视图id
  path: string;   // 视图路径
}

export interface Config {
  [foo: string]: string;
}

export interface CreateParams {
  name: string;           // 项目名
  desc: string;           // 项目简介
  config: Config;         // 项目配置
  views: ViewConfig[];    // 视图配置列表
}

export interface Project extends CreateParams {
  _id: string;    // 项目id
  ct: string;     // 项目创建时间
  ut: string;     // 项目更新时间
}

export interface ConfigType {
  type?: string;    // 默认为input
  key: string;
  title: string;
  placeholder: string;
}

export interface PropType {
  value: any[];
  config: ConfigType[];
  onChange: (value: any) => void;
}

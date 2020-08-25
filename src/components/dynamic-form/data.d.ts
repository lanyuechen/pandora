export interface Option {
  key: string;
  value: string;
}

export interface ConfigType {
  type?: string;    // 默认为input
  key: string;
  title: string;
  placeholder?: string;
  options?: Option[];
}

export interface PropType {
  value: any[];
  config: ConfigType[];
  onChange: (value: any) => void;
}

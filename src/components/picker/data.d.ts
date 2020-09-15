export interface OptionType {
  key: string;
  value: string;
}

export interface PropsType {
  options: OptionType[] | string[];
  value: string;
  title: string;
  onChange: (val: string) => void
}
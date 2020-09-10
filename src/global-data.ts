import _ from 'lodash';

const __globalData: any = {}

export function set (key: string, val: any) {
  _.set(__globalData, key, val);
}

export function get (key: string) {
  return _.get(__globalData, key)
}
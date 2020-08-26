import DB from '@/utils/db';
import { View, CreateParams, SubsetConfig } from '@/pages/views/data';

export async function list(spec: any) {
  const res: View[] = DB.table('view').find(spec);
  return {
    success: true,
    data: res,
  };
}

export async function detail(id: string) {
  const res: View = DB.table('view').findOne({_id: id});
  return {
    success: true,
    data: res,
  };
}

export async function create(data: CreateParams) {
  const res = DB.table('view').insert({
    ...data,
    ct: new Date().toISOString(),
    ut: new Date().toISOString(), 
  });
  return {
    success: true,
    data: res,
  };
}

export async function update(id: string, data: CreateParams) {
  const res = DB.table('view').update({_id: id}, {
    ...data,
    ut: new Date().toISOString(), 
  });
  return {
    success: true,
    data: res,
  };
}

export async function remove(id: string) {
  DB.table('view').delete({_id: id});
  return {
    success: true
  };
}

export async function removeSubset(id: string, idx: number) {
  DB.table('view').update({_id: id}, (d: any) => ({
    ...d,
    subsets: d.subsets.filter((_: SubsetConfig, i: number) => i !== idx),
  }));
  return {
    success: true
  };
}
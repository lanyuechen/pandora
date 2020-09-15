import DB from '@/utils/db';
import { Component, CreateParams } from '@/pages/components/data';

export async function list(spec: any) {
  const res: Component[] = DB.table('component').find(spec);
  return {
    success: true,
    data: res,
  };
}

export async function detail(id: string) {
  const res: Component = DB.table('component').findOne({_id: id});
  return {
    success: true,
    data: res,
  };
}

export async function create(data: CreateParams) {
  const res = DB.table('component').insert({
    ...data,
    config: data.config || {},
    ct: new Date().toISOString(),
    ut: new Date().toISOString(), 
  });
  return {
    success: true,
    data: res,
  };
}

export async function update(id: string, data: CreateParams) {
  const res = DB.table('component').update({_id: id}, {
    ...data,
    ut: new Date().toISOString(), 
  });
  return {
    success: true,
    data: res,
  };
}

export async function remove(id: string) {
  DB.table('component').delete({_id: id});
  return {
    success: true
  };
}

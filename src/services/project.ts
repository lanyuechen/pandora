import DB from '@/utils/db';
import { Project, CreateParams, SubsetConfig } from '@/pages/projects/data';

export async function list(spec: any) {
  const res: Project[] = DB.table('project').find(spec);
  return {
    success: true,
    data: res,
  };
}

export async function detail(id: string) {
  const res: Project = DB.table('project').findOne({_id: id});
  return {
    success: true,
    data: res,
  };
}

export async function create(data: CreateParams) {
  const res = DB.table('project').insert({
    ...data,
    subsets: data.subsets || [],
    ct: new Date().toISOString(),
    ut: new Date().toISOString(), 
  });
  return {
    success: true,
    data: res,
  };
}

export async function update(id: string, data: CreateParams) {
  const res = DB.table('project').update({_id: id}, {
    ...data,
    ut: new Date().toISOString(), 
  });
  return {
    success: true,
    data: res,
  };
}

export async function remove(id: string) {
  DB.table('project').delete({_id: id});
  return {
    success: true
  };
}

export async function addSubset(id: string, data: SubsetConfig) {
  const res = DB.table('project').update({_id: id}, (d: Project) => ({
    ...d,
    subsets: [
      ...d.subsets,
      data
    ]
  }));
  return {
    success: true,
    data: res,
  };
}

export async function updateSubset(id: string, idx: number, data: SubsetConfig) {
  const res = DB.table('project').update({_id: id}, (d: Project) => ({
    ...d,
    subsets: d.subsets.map((s: SubsetConfig, i: number) => i === idx ? data : s)
  }));
  return {
    success: true,
    data: res,
  };
}

export async function removeSubset(id: string, idx: number) {
  DB.table('project').update({_id: id}, (d: any) => ({
    ...d,
    subsets: d.subsets.filter((_: SubsetConfig, i: number) => i !== idx),
  }));
  return {
    success: true
  };
}
import DB from '@/utils/db';
import { Project, CreateParams } from '@/pages/projects/data';

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

export async function removeViews(id: string, path: string) {
  DB.table('project').update({_id: id}, (d: any) => ({
    ...d,
    views: d.views.filter((v: any) => v.path !== path),
  }));
  return {
    success: true
  };
}
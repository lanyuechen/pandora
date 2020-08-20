import DB from '@/utils/db';

export async function list(spec: any) {
  const res = DB.table('project').find(spec);
  return {
    success: true,
    data: res,
  };
}

export async function create(data: any) {
  const res = DB.table('project').insert(data);
  return {
    success: true,
    data: res,
  }
}

export async function remove(id: string) {
  return DB.table('project').delete({_id: id});
}
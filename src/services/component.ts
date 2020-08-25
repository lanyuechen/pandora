import DB from '@/utils/db';

export async function list(spec: any) {
  const res = DB.table('component').find(spec);
  return {
    success: true,
    data: res,
  };
}

export async function create(data: any) {
  const res = DB.table('component').insert(data);
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
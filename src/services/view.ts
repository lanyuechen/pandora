import DB from '@/utils/db';

export async function list(spec: any) {
  const res = DB.table('view').find(spec);
  return {
    success: true,
    data: res,
  };
}

export async function create(data: any) {
  const res = DB.table('view').insert(data);
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
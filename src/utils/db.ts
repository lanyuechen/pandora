import Loki, { Collection } from 'lokijs';
import { uuid } from '@/utils/common';
import Taro from '@tarojs/taro';

const DB_NAME = 'pandora.db';
const DB_INSTANCE = Symbol.for('db-instance-key');

class TaroAdapter {
  loadDatabase(dbname: string, callback: (err: any) => void) {
    try {
      const serializedDb = Taro.getStorageSync(dbname);
      callback(serializedDb);
    } catch(err) {
      callback(err);
    }
  }

  saveDatabase(dbname: string, dbstring: string, callback: (err: any) => void) {
    try {
      Taro.setStorageSync(dbname, dbstring);
      callback(null)
    } catch(err) {
      callback(err);
    }
  }
}

const adapter = new TaroAdapter();

class DB {
  db: Loki;
  collection: Collection | any;

  static getInstance() {
    if (!window[DB_INSTANCE]) {
      window[DB_INSTANCE] = new DB();
    }
    return window[DB_INSTANCE];
  }

  constructor() {
    this.db = new Loki(DB_NAME, {
      env: 'BROWSER',
      autosave: true,
      autoload: true,
      adapter: adapter,
    });
  }

  table(name: string) {
    this.collection = this.db.getCollection(name) || this.db.addCollection(name);
    return this;
  }

  find(spec = {}) {
    return this.collection.find(spec);
  }

  findOne(spec = {}) {
    return this.collection.findOne(spec);
  }

  insert(data: any) {
    const _id = uuid();
    this.collection.insert({...data, _id});
  }

  update(spec = {}, data: any) {
    this.collection.findAndUpdate(spec, (d: any) => {
      data = typeof data === 'function' ? data(d) : data;
      Object.assign(d, data);
    });
  }

  delete(spec = {}) {
    this.collection.findAndRemove(spec);
  }
}

export default DB.getInstance();
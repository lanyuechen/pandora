import Loki, { Collection, LokiLocalStorageAdapter as Adapter } from 'lokijs';
import LeanStorage from '@/utils/lean-storage';
import { uuid } from '@/utils/common';

const DB_NAME = 'pandora.db';
const DB_INSTANCE = Symbol.for('db-instance-key');
const adapter = new Adapter();

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
      // autoload: true,
      adapter: adapter,
    });
    this.syncDown();
  }

  /**
   * 从服务器向本地同步数据
   */
  syncDown() {
    // this.db.loadDatabase();
    LeanStorage.query().then((res: any) => {
      this.db.loadJSON(res);
    }).catch((err: any) => {
      console.log('【error】', err);
    });
  }

  /**
   * 从本地向服务器同步数据
   */
  syncUp() {
    LeanStorage.save(this.db.serialize())
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
    this.syncUp();
  }

  update(spec = {}, data: any) {
    this.collection.findAndUpdate(spec, (d: any) => {
      data = typeof data === 'function' ? data(d) : data;
      Object.assign(d, data);
      this.syncUp();
    });
  }

  delete(spec = {}) {
    this.collection.findAndRemove(spec);
    this.syncUp();
  }
}

export default DB.getInstance();
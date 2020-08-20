import loki, { Collection, LokiLocalStorageAdapter as Adapter } from 'lokijs';
import { uuid } from './common';

const DB_NAME = 'pandora.db';
const DB_INSTANCE = Symbol.for('db-instance-key');
const adapter = new Adapter();

class DB {
  db: any;
  collection: Collection;

  static getInstance() {
    if (!window[DB_INSTANCE]) {
      window[DB_INSTANCE] = new DB();
    }
    return window[DB_INSTANCE];
  }

  constructor() {
    this.db = new loki(DB_NAME, {
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
    this.collection.findAndUpdate(spec, (d) => {
      Object.assign(d, data);
      return true;
    });
  }

  delete(spec = {}) {
    this.collection.findAndRemove(spec);
  }
}

export default DB.getInstance();
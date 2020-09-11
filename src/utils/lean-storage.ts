import AV from 'leancloud-storage/dist/av-weapp';

const AV_INSTANCE = Symbol.for('av-instance');

class LeanStorage {
  constructor() {
    AV.init({
      appId: "Yh1f25kOE5DMMJVrPCW8wqPX-gzGzoHsz",
      appKey: "gezRAnDwUok7CxBUAJyyrMF2",
      serverURL: "https://yh1f25ko.lc-cn-n1-shared.com"
    });
  }

  static getInstance() {
    if (!window[AV_INSTANCE]) {
      window[AV_INSTANCE] = new LeanStorage();
    }
    return window[AV_INSTANCE];
  }

  test() {
    const TestObject = AV.Object.extend('TestObject');
    const testObject = new TestObject();
    testObject.set('words', 'Hello world!');
    testObject.save().then(() => {
      console.log('保存成功。')
    })
  }

  async save(data: any) {
    const query = new AV.Query('Pandora');
    const res = await query.first();
    res.set('data', data);
    AV.Object.saveAll([res]);
  }

  async query() {
    const query = new AV.Query('Pandora');
    const res = await query.first();
    if (res) {
      return res.get('data');
    }
  }
}

export default LeanStorage.getInstance();

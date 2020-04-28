import { Vue, Component } from 'vue-property-decorator';
import store from './store';
import { getImageUrl, handleError, timeAgo } from '@/utils';
import Empty from '@/components/empty/empty';
import storage from '@/utils/storage';

@Component({
  components: {
    Empty
  }
})
class Index extends Vue {
  list: any = [];
  detail: any = {};
  loginInfo: any = {};
  subAmount: number = 0;
  res: any = {};
  scrollTop: number = 1;
  msg: string = '';

  async onShow() {
    this.loginInfo = storage.get('loginInfo');
    this.loginInfo.realIcon = getImageUrl(this.loginInfo.icon);
    this.detail = storage.get('msgDetail');
    wx.setNavigationBarTitle({ title: this.detail.office });
    this.clean();
    store.commit('clean');
    await this.initList();
  }

  async initList(data?) {
    const req = data || { userId: this.detail.userId, length: 10 };
    await store.dispatch('getDetailList', req).catch(handleError);
    this.list = store.state.list.map(c => {
      c.releaseTime = timeAgo(c.createTime);
      return c;
    });
    this.res = store.state.res;
    this.res.realIcon = getImageUrl(this.res.icon);
    this.subAmount = store.state.subAmount;
  }

  clean() {
    this.list = [];
    this.subAmount = 0;
  }

  async upper() {
    if (this.subAmount > 0) {
      const firstChild = this.list[0];
      let data: any = {};
      data.length = 10;
      data.messageId = firstChild.messageId;
      data.userId = this.detail.userId;
      await this.initList(data);
    }
  }

  inputMsg(e) {
    this.msg = e.mp.detail.value;
  }

  async sendMsg() {
    if (this.msg === '') {
      return;
    }
    const data = { userId: this.res.userId, content: this.msg };
    await store.dispatch('sendMsg', data).catch(handleError);
    this.list = store.state.list;
    this.msg = '';
    this.scrollTop += 111135;
    console.log(this.list);
  }

  onUnload() {
    storage.remove('msgDetail');
    this.detail = {};
    this.loginInfo = {};
    this.msg = '';
    this.res = {};
    this.subAmount = 0;
    this.list = {};
    this.scrollTop = 0;
    store.commit('clean');
    store.commit('clearLoginInfo');
  }
}

export default Index;

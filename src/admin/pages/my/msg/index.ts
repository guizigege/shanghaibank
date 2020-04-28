import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
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
  subAmount: number = 0;
  isEmpty: boolean = true;

  onLoad() {
    wx.setNavigationBarTitle({ title: '消息' });
  }
  get loading() {
    return store.state.loading;
  }
  async onShow() {
    this.clean();
    store.commit('clean');
    await this.initList();
  }

  async onPullDownRefresh() {
    this.clean();
    store.commit('clean');
    await this.initList();
    wx.stopPullDownRefresh();
  }

  async initList() {
    await store.dispatch('getList', { length: 10 }).catch(handleError);
    this.list = store.state.list.map(c => {
      c.releaseTime = timeAgo(c.createTime);
      c.realIcon = getImageUrl(c.icon);
      return c;
    });
    this.subAmount = store.state.subAmount;
    this.isEmpty = this.list.length === 0;
  }

  clean() {
    this.list = [];
    this.subAmount = 0;
    this.isEmpty = true;
  }

  // 上拉
  async onReachBottom() {
    if (this.subAmount > 0) {
      const lastChild = this.list[this.list.length - 1];
      let data: any = {};
      data.length = 10;
      data.messageId = lastChild.messageId;
      await store.dispatch('getList', data).catch(handleError);
      this.list = store.state.list.map(c => {
        c.releaseTime = timeAgo(c.createTime);
        c.realIcon = getImageUrl(c.icon);
        return c;
      });
      this.subAmount = store.state.subAmount;
      this.isEmpty = this.list.length === 0;
    }
  }

  msgDetail(e) {
    storage.set('msgDetail', this.list[e]);
    wx.navigateTo({
      url: AppUrls.ADMIN_MY_MSG_DETAIL
    });
  }
}

export default Index;

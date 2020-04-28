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
  isLoad: boolean = false;

  onLoad() {
    wx.setNavigationBarTitle({ title: '消息' });
  }

  async onShow() {
    this.clean();
    store.commit('clean');
    await this.initList();
    this.isLoad = true;
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
  }

  clean() {
    this.list = [];
    this.subAmount = 0;
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
    }
  }

  msgDetail(e) {
    storage.set('msgDetail', this.list[e]);
    wx.navigateTo({
      url: AppUrls.CLIENT_MY_MSG_DETAIL
    });
  }
}

export default Index;

import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import store from './store';
import { handleError, timeAgo } from '@/utils';
import Empty from '@/components/empty/empty';
import storage from '@/utils/storage';

@Component({
  components: {
    Empty
  }
})
class HelpList extends Vue {
  list: any = [];
  subAmount: number = 0;
  isEmpty: boolean = true;
  get loading() {
    return store.state.loading;
  }
  onLoad() {
    wx.setNavigationBarTitle({ title: '帮助' });
  }

  async onShow() {
    this.clean();
    store.commit('clean');
    await this.initList();
  }

  async onPullDownRefresh() {
    this.clean();
    store.commit('clean');
    wx.stopPullDownRefresh();
    await this.initList();
  }

  async initList() {
    await store.dispatch('getList', { length: 10 }).catch(handleError);
    this.list = store.state.list.map(c => {
      c.releaseTime = timeAgo(c.createTime);
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
      data.createTime = lastChild.createTime;
      await store.dispatch('getList', data).catch(handleError);
      this.list = store.state.list.map(c => {
        c.releaseTime = timeAgo(c.createTime);
        return c;
      });
      this.subAmount = store.state.subAmount;
      this.isEmpty = this.list.length === 0;
    }
  }

  helpDetail(e) {
    storage.set('helpDetail', this.list[e]);
    wx.navigateTo({
      url: AppUrls.CLIENT_MY_HELP_DETAIL
    });
  }
}

export default HelpList;

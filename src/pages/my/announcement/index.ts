import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import { EAnnouncement } from '@/models/enums';
import store from './store';
import { handleError, timeAgo } from '@/utils';
import Empty from '@/components/empty/empty';
import storage from '@/utils/storage';

@Component({
  components: {
    Empty
  }
})
class AnnouncementList extends Vue {
  list: any = [];
  subAmount: number = 0;
  isLoad: boolean = false;

  onLoad() {
    wx.setNavigationBarTitle({ title: '公告' });
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
    wx.stopPullDownRefresh();
    await this.initList();
  }

  async initList() {
    await store.dispatch('getList', { length: EAnnouncement.AnnouncementPageCount }).catch(handleError);
    this.list = store.state.list.map(c => {
      c.releaseTime = timeAgo(c.beginTime);
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
      data.length = EAnnouncement.AnnouncementPageCount;
      data.beginTime = lastChild.beginTime;
      await store.dispatch('getList', data).catch(handleError);
      this.list = store.state.list.map(c => {
        c.releaseTime = timeAgo(c.beginTime);
        return c;
      });
      this.subAmount = store.state.subAmount;
    }
  }

  announcementDetail(e) {
    storage.set('noticeDetail', this.list[e]);
    wx.navigateTo({
      url: AppUrls.CLIENT_MY_ANNOUNCEMENT_DETAIL
    });
  }
}

export default AnnouncementList;

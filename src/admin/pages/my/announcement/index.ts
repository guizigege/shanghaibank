import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import { EAnnouncement } from '@/models/enums';
import store from './store';
import auth from '@/api/auth';
import { handleError, timeAgo } from '@/utils';
import Empty from '@/components/empty/empty';
import storage from '@/utils/storage';

@Component({
  components: {
    Empty
  }
})
class AnnouncementList extends Vue {
  isBranch = '';
  list: any = [];
  subAmount: number = 0;
  delModal: boolean = false;
  delIndex: number = 0;
  isLoad: boolean = false;

  onLoad() {
    wx.setNavigationBarTitle({ title: '公告' });
    this.isBranch = auth.isBranch;
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

  longEvent(i) {
    const that = this;
    wx.showActionSheet({
      itemList: ['编辑公告', '删除公告'],
      async success(res) {
        if (res.tapIndex === 0) {
          that.editEvent(i);
        }
        if (res.tapIndex === 1) {
          that.delModal = true;
          that.delIndex = i;
        }
      }
    });
  }

  editEvent(i) {
    wx.navigateTo({
      url: AppUrls.ADMIN_ANNOUNCEMENT_FORM
    });
    storage.set('noticeDetail', this.list[i]);
  }

  async delModalOK() {
    await store.dispatch('delAnnouncement', { noticeId: this.list[this.delIndex].noticeId }).catch(handleError);
    this.delModal = false;
    this.list = store.state.list;
  }

  delModalCancel() {
    this.delModal = false;
  }

  async initList() {
    await store.dispatch('getList', { length: EAnnouncement.AnnouncementPageCount }).catch(handleError);
    this.list = store.state.list.map(c => {
      if (this.isBranch) {
        c.releaseTime = timeAgo(c.createTime);
      } else {
        c.releaseTime = timeAgo(c.beginTime);
      }
      return c;
    });
    this.subAmount = store.state.subAmount;
  }

  clean() {
    this.list = [];
    this.subAmount = 0;
    this.delModal = false;
    this.delIndex = 0;
  }

  // 上拉
  async onReachBottom() {
    if (this.subAmount > 0) {
      const lastChild = this.list[this.list.length - 1];
      let data: any = {};
      data.length = EAnnouncement.AnnouncementPageCount;
      if (this.isBranch) {
        data.createTime = lastChild.createTime;
      } else {
        data.beginTime = lastChild.beginTime;
      }
      await store.dispatch('getList', data).catch(handleError);
      this.list = store.state.list.map(c => {
        if (this.isBranch) {
          c.releaseTime = timeAgo(c.createTime);
        } else {
          c.releaseTime = timeAgo(c.beginTime);
        }
        return c;
      });
      this.subAmount = store.state.subAmount;
    }
  }

  announcementDetail(e) {
    storage.set('noticeDetail', this.list[e]);
    wx.navigateTo({
      url: AppUrls.ADMIN_ANNOUNCEMENT_DETAIL
    });
  }

  onClickAddNew() {
    wx.navigateTo({
      url: AppUrls.ADMIN_ANNOUNCEMENT_FORM
    });
  }
}

export default AnnouncementList;

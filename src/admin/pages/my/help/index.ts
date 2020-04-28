import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
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
class HelpList extends Vue {
  isBranch = auth.isBranch;
  isOffice = auth.isOffice;
  isManager = auth.isManager;

  list: any = [];
  subAmount: number = 0;
  isEmpty: boolean = true;
  delModal: boolean = false;
  delIndex: number = 0;

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

  longEvent(i) {
    // const that = this;
    // wx.showActionSheet({
    //   itemList: ['编辑帮助', '删除帮助'],
    //   async success(res) {
    //     if (res.tapIndex === 0) {
    //       that.editEvent(i);
    //     }
    //     if (res.tapIndex === 1) {
    //       that.delModal = true;
    //       that.delIndex = i;
    //     }
    //   }
    // });
  }

  editEvent(i) {
    wx.navigateTo({
      url: AppUrls.ADMIN_HELP_FORM
    });
    storage.set('helpDetail', this.list[i]);
  }

  async delModalOK() {
    await store.dispatch('delHelp', { noticeId: this.list[this.delIndex].noticeId }).catch(handleError);
    this.delModal = false;
    this.list = store.state.list;
  }

  delModalCancel() {
    this.delModal = false;
  }

  async initList() {
    await store.dispatch('getList', { length: 10 }).catch(handleError);
    this.list = store.state.list.map(c => {
      if (this.isBranch) {
        c.releaseTime = timeAgo(c.createTime);
      } else {
        c.releaseTime = timeAgo(c.beginTime);
      }
      return c;
    });
    this.subAmount = store.state.subAmount;
    this.isEmpty = this.list.length === 0;
  }

  clean() {
    this.list = [];
    this.subAmount = 0;
    this.isEmpty = true;
    this.delModal = false;
    this.delIndex = 0;
  }

  // 上拉
  async onReachBottom() {
    if (this.subAmount > 0) {
      const lastChild = this.list[this.list.length - 1];
      let data: any = {};
      data.length = 10;
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
      this.isEmpty = this.list.length === 0;
    }
  }

  helpDetail(e) {
    storage.set('helpDetail', this.list[e]);
    wx.navigateTo({
      url: AppUrls.ADMIN_HELP_DETAIL
    });
  }

  onClickAddNew() {
    wx.navigateTo({
      url: AppUrls.ADMIN_HELP_FORM
    });
  }
}

export default HelpList;

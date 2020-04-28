import { Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import CardBankBranch from '@/components/card-bank-branch/card-bank-branch';
import store from '../store';
import Empty from '@/components/empty/empty';
import storage from '@/utils/storage';
import { mixins } from 'vue-class-component';
import CalcDistanceMixin from '@/mixin/calcDistMixin';
import WxRouter from '@/mixin/wxRouter';

@Component({
  components: {
    CardBankBranch,
    Empty
  }
})
class BranchAllBank extends mixins(CalcDistanceMixin, WxRouter) {
  AppUrls = AppUrls;
  isLoad = false;
  allBankList: any = [];

  onLoad() {
    wx.setNavigationBarTitle({ title: '所有网点' });
  }

  async onShow() {
    await store.dispatch('getAllBank', { allManager: true });
    this.isLoad = true;
    this.allBankList = store.state.allList.map(item => {
      const d: any = item;
      this.calcDistance(d.location)
        .then(res => {
          this.$set(d, 'dist', res);
        });
      d.ex = JSON.parse(d.extendInfo);
      d.icon = d.ex.userInfo.coverUrl || '';
      d.weekdayAmStartHour = d.ex.userInfo.weekdayAmStartHour;
      d.weekdayPmEndHour = d.ex.userInfo.weekdayPmEndHour;
      d.holidayAmStartHour = d.ex.userInfo.holidayAmStartHour;
      d.holidayPmEndHour = d.ex.userInfo.holidayPmEndHour;
      d.desc = d.ex.userInfo.abstract;
      d.hasDist = 'dist' in d;
      return d;
    });
  }

  selectItem(i) {
    storage.set('bankDetail', this.allBankList[i]);
    this.navigateTo(AppUrls.COMMON_BANK_INFO);
  }

  onUnload() {
    this.isLoad = false;
    store.commit('clearAllList');
    this.allBankList = [];
  }
}

export default BranchAllBank;

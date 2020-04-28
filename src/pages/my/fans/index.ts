import { Component } from 'vue-property-decorator';
import store from './store';
import { handleError } from '@/utils';
import Empty from '@/components/empty/empty';
import storage from '@/utils/storage';
import CardBankBranch from '@/components/card-bank-branch/card-bank-branch';
import CardManagerIntro from '@/components/card-manager-intro/card-manager-intro';
import CardUserInfo from '@/components/card-user-info/card-user-info';
import { AppType, Roles } from '@/models/enums';
import { AppUrls } from '@/utils/consts';
import { mixins } from 'vue-class-component';
import CalcDistanceMixin from '@/mixin/calcDistMixin';
import WxRouter from '@/mixin/wxRouter';

@Component({
  components: {
    Empty,
    CardBankBranch,
    CardManagerIntro,
    CardUserInfo
  }
})
class Index extends mixins(CalcDistanceMixin, WxRouter) {
  list: any = [];
  subAmount: number = 0;
  res: any = {};
  loginInfo: any = {};
  isLoad: boolean = false;
  roles = Roles;
  appType = AppType;

  async onShow() {
    this.loginInfo = storage.get('loginInfo');
    wx.setNavigationBarTitle({ title: '我的粉丝' });
    this.clean();
    store.commit('clean');
    await this.initList();
    this.isLoad = true;
  }

  async initList(data?) {
    const req = { userId: this.loginInfo.userId, length: 6 };
    if (data) {
      Object.assign(req, data);
    }
    await store.dispatch('fanList', req).catch(handleError);
    const l = store.state.list.map(c => {
      try {
        c.ex = JSON.parse(c.extendInfo);
        if (c.submitType === Roles.Office) {
          c.icon = c.ex.userInfo.coverUrl || '';
          c.weekdayAmStartHour = c.ex.userInfo.weekdayAmStartHour;
          c.weekdayPmEndHour = c.ex.userInfo.weekdayPmEndHour;
          c.holidayAmStartHour = c.ex.userInfo.holidayAmStartHour;
          c.holidayPmEndHour = c.ex.userInfo.holidayPmEndHour;
          c.desc = c.ex.userInfo.abstract || '';
          this.calcDistance(c.location)
            .then(res => {
              this.$set(c, 'dist', res);
            });
          c.hasDist = 'dist' in c;
        }
      } catch (e) {
        console.log(e);
      }
      return c;
    });
    this.list = l;
    this.res = store.state.res;
    this.subAmount = store.state.subAmount;
  }

  selectItem(i) {
    storage.set('bankDetail', this.list[i]);
    this.navigateTo(AppUrls.COMMON_BANK_INFO);
  }

  lookUserInfo(i) {
    this.navigateTo(`${AppUrls.COMMON_USER_INFO}?userId=${this.list[i]['userId']}`);
  }

  currentManager(index) {
    storage.set('manageDetail', JSON.stringify(this.list[index]));
    this.navigateTo(`${AppUrls.CLIENT_MANAGERS_DETAIL}?userId=${this.list[index]['userId']}`);
  }

  sendMsg(i) {
    storage.set('msgDetail', this.list[i]);
    this.navigateTo(AppUrls.CLIENT_MY_MSG_DETAIL);
  }

  clean() {
    this.list = [];
    this.subAmount = 0;
  }

  async onReachBottom() {
    if (this.subAmount > 0) {
      const last = this.list[this.list.length - 1];
      await this.initList({ createTime: last.createTime });
    }
  }

  onUnload() {
    this.res = {};
    this.subAmount = 0;
    this.list = {};
    store.commit('clean');
    this.loginInfo = {};
    store.commit('clearLoginInfo');
    this.isLoad = false;
  }
}

export default Index;

import { Vue, Component } from 'vue-property-decorator';
import store from './store';
import { handleError } from '@/utils';
import Empty from '@/components/empty/empty';
import storage from '@/utils/storage';
import CardBankBranch from '@/components/card-bank-branch/card-bank-branch';
import CardManagerIntro from '@/components/card-manager-intro/card-manager-intro';
import CardFansInfo from '@/components/card-fans-info/card-fans-info';
import { AppType, Roles } from '@/models/enums';

@Component({
  components: {
    Empty,
    CardBankBranch,
    CardManagerIntro,
    CardFansInfo
  }
})
class Index extends Vue {
  list: any = [];
  subAmount: number = 0;
  loginInfo: any = {};
  isLoad: boolean = false;
  roles = Roles;
  appType = AppType;
  isEmpty: boolean = true;
  needFocus: boolean = true;
  userId: string = '';
  get loading() {
    return store.state.loading;
  }
  onLoad(options) {
    wx.setNavigationBarTitle({ title: '粉丝' });
    if (options.userId) {
      this.userId = options.userId;
    } else {
      this.loginInfo = storage.get('loginInfo');
      this.userId = this.loginInfo.userId;
    }
  }

  async onShow() {
    this.clean();
    store.commit('clean');
    await this.initList();
    this.isLoad = true;
  }

  async initList() {
    const req = { userId: this.userId, length: 6 };
    await store.dispatch('fanList', req).catch(handleError);
    this.list = store.state.list.map(c => {
      if (c.submitType === Roles.Office) {
        c.bankName = c.userName;
        c.ex = JSON.parse(c.extendInfo);
        c.weekdayAmStartHour = c.ex.userInfo.weekdayAmStartHour;
        c.weekdayPmEndHour = c.ex.userInfo.weekdayPmEndHour;
        c.holidayAmStartHour = c.ex.userInfo.holidayAmStartHour;
        c.holidayPmEndHour = c.ex.userInfo.holidayPmEndHour;
      }
      if (c.submitType === Roles.Manager) {
        c.ex = JSON.parse(c.extendInfo);
        c.title = c.ex.userInfo.title;
      }
      if (this.appType.Client === c.appId) {
        c.focusState = c.isFriending;
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
  }

  onUnload() {
    this.subAmount = 0;
    this.list = {};
    store.commit('clean');
    this.loginInfo = {};
    store.commit('clearLoginInfo');
    this.isLoad = false;
  }
}

export default Index;

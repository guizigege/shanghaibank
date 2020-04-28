import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import store from './store';

@Component({
  components: {}
})
class Index extends Vue {
  AppUrls = AppUrls;

  isBranch: boolean = false;
  isOffice: boolean = false;
  isManager: boolean = false;
  mobile: string = ''; // 手机号码
  wxNumber: string = ''; // 微信号
  realName: string = ''; // 姓名
  isFocus: number = 0; // 是否允许他人关注 （0=否 1=是）

  onShow() {
    store.commit('getLoginInfo');
    this.mobile = store.state.loginInfo.mobile;
    this.wxNumber = store.state.loginInfo.wxNumber;
    this.realName = store.state.loginInfo.realName;
    this.isFocus = store.state.loginInfo.isFocus;
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '设置' });
  }

  onUnload() {
    store.commit('clearLoginInfo');
    this.isFocus = 0;
  }

  async focusChange(e) {
    await store.dispatch('saveInfo', { isFocus: Number(e.mp.detail.value) });
    this.isFocus = store.state.loginInfo.isFocus;
  }
}

export default Index;

import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import store from './store';
import { handleError } from '@/utils';
const debug = require('@/utils/debug')('log:Admin/My/purse');

@Component({
  components: {}
})
class Index extends Vue {
  AppUrls = AppUrls;
  get cash() {
    return store.state.cash;
  }
  async onShow() {
    // 小程序 hook
    debug('onShow');
    await store.dispatch('myCash').catch(handleError);
  }

  mounted() {
    // vue hook
    debug('mounted');
  }

  toRecharge() {
    wx.navigateTo({
      url: this.AppUrls.ADMIN_MY_PURSE_RECHARGE
    });
  }

  toWithdraw() {
    wx.navigateTo({
      url: this.AppUrls.ADMIN_MY_PURSE_WITHDRAW
    });
  }
}

export default Index;

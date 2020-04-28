import { Vue, Component } from 'vue-property-decorator';
import { IconWeChat, AppUrls } from '@/utils/consts';
import store from '../store';
const debug = require('@/utils/debug')('log:recharge');
@Component({

})
class Recharge extends Vue {
  AppUrls = AppUrls;
  iconWeChat = IconWeChat;
  money: number;
  onShow() {
    // 小程序 hook
    debug('onShow');
  }
  get withdrawTips() {
    return store.state.tips.withdraw;
  }
  get cash() {
    return store.state.cash;
  }
  inputMoney(e) {
    this.money = e.mp.detail.value;
  }
  doWithdraw() {
    store.dispatch('withdraw',this.money).catch(err => console.log(err));
  }
  async mounted() {
    // vue hook
    debug('mounted');
    wx.setNavigationBarTitle({
      title: '提现'
    });
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    });
  }
}
export default Recharge;

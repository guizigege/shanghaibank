import { Vue, Component } from 'vue-property-decorator';
import store from '../store';
@Component
class Index extends Vue {
  moneyList: Array<string> = ['5','10','20','50','100','200'];
  tips: Array<string> = [
    '每日可提现一次',
    '提现将直接打入微信零钱',
    '微信充值，24小时到账',
    '若充值失败，将会退回原账户',
    '若遇到法定节假日、公休日、到账日期顺延',
    '系统默认将钱打入授权登入小程序的微信账户'
  ];
  get money() {
    return store.state.money;
  }
  get withdrawMoney() {
    return store.state.withdrawMoney;
  }
  get authName() {
    return store.state.userInfo.userName;
  }
  selectMoney(money) {
    store.commit('selectMoney',money);
  }
  doWithdraw() {
    store.dispatch('withdraw',this.withdrawMoney).catch(err => console.log(err));
  }
  onShow() {
    store.dispatch('money').catch(err => console.log(err));
    store.dispatch('userInfo').catch(err => console.log(err));
  }
}
export default Index;

import { Vue, Component } from 'vue-property-decorator';
import { IconWeChat, AppUrls } from '@/utils/consts';
import { checkMoney } from "@/utils";
import store from '../store';
const debug = require('@/utils/debug')('log:recharge');
@Component({})
class Recharge extends Vue {
  AppUrls = AppUrls;
  iconWeChat = IconWeChat;
  money: any = null;
  onShow() {
    // 小程序 hook
    debug('onShow');
  }
  onHide() {
    this.money = null;
  }
  get cash() {
    return store.state.cash;
  }
  get rechargeTips() {
    return store.state.tips.recharge;
  }
  inputMoney(e) {
    this.money = e.mp.detail.value;
  }
  async doRecharge() {
    if(checkMoney(this.money)){
      let money = Number(this.money);
      if(money!==0){
        try {
          const data = await store.dispatch('recharge', {
            desc: '微信支付，充值',
            // totalFee: money * 100,  // 人民币元转换为分
            totalFee: 1  // to do: 移除测试代码，使用上一行代码
          });
          const { timeStamp, nonceStr, signType, paySign } = data;
          const successFn = () => {
            store.dispatch('myCash').then(() => {
              wx.hideToast();
              wx.showToast({
                title: '支付成功',
                icon: 'loading'
              });
              wx.navigateBack({
                delta: 1
              });
            });
          };
          wx.requestPayment({
            timeStamp,
            nonceStr,
            package: data.package,
            signType,
            paySign,
            success: successFn,
            fail(res) {
              console.error('支付失败 :', res);
            }
          });
        } catch (err) {
          wx.showToast({
            title: err || '支付失败',
            icon: 'loading'
          });
        }
      }else{
        wx.showToast({
          title: '金额不能为0',
          icon: 'loading'
        })
      }
    } else {
      wx.showToast({
        title: '金额格式错误',
        icon: 'loading'
      })
    }
  }
  async mounted() {
    // vue hook
    debug('mounted');
    wx.setNavigationBarTitle({
      title: '充值'
    });
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    });
  }
}
export default Recharge;

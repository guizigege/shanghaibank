import { Vue, Component, Prop } from 'vue-property-decorator';
import { formatTime, formatMoney } from '@/utils';
import { RechargeStatus, WithdrawStatus } from '@/models/enums';
import { EnumValues } from '@/utils/enum-values';

@Component({})
class CardWalletInfo extends Vue {
  @Prop() item: any;
  @Prop({ default: 'recharge' }) type:string;

  recharge = {
    success: RechargeStatus.充值成功,
    fail: RechargeStatus.充值失败
  };
  withdraw = {
    withdrawing: WithdrawStatus.提现中,
    success: WithdrawStatus.提现成功,
    fail: WithdrawStatus.提现失败,
    other: WithdrawStatus.待定
  };
  get money() {
    if(this.item.totalFee===undefined||this.item.totalFee===null){
      return this.item.money? this.item.money.toFixed(2): '0.00';
    }else{
      return this.item.totalFee? formatMoney(this.item.totalFee): '0.00'
    }

  }
  get dateTime() {
    return this.item.createTime ? formatTime(+this.item.createTime) : ''
  }
  get state() {
    if(this.item.state===undefined||this.item.state===null){
      return '未知'
    }else{
      return `${EnumValues.getNameFromValue(
        RechargeStatus,
        this.item.state
      )}`;
    }
  }

  get status() {
    if(this.item.status===undefined||this.item.status===null){
      return '未知'
    }else{
      return `${EnumValues.getNameFromValue(
        WithdrawStatus,
        this.item.status
      )}`;
    }
  }
}
export default CardWalletInfo;

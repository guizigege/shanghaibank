import { Vue, Component, Prop } from 'vue-property-decorator';
import { getImageUrl, formatTime } from '@/utils';
@Component
class CardRedPacketCustomer extends Vue {
  @Prop() user: any;
  get money() {
    return this.user.money?this.user.money.toFixed(2):'0.00';
  }
  get createTime() {
    return this.user.createTime
      ? formatTime(+this.user.createTime)
      : '';
  }
  onLoad() {
    console.log(this.user.money);
    this.user.icon = getImageUrl(this.user.icon);
  }
}
export default CardRedPacketCustomer;

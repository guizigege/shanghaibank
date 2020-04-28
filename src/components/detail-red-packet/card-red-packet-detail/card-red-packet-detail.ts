import { Vue, Component, Prop } from 'vue-property-decorator';
import { emptyRedPacketDetail, RedPacketDetail } from '@/models/redPacket';
import { formatTime } from '@/utils';

@Component
class CardRedPacketDetail extends Vue {
  @Prop({ default: emptyRedPacketDetail }) detail: RedPacketDetail;

  get dateTime() {
    // watch 无效，使用 onLoad 与 onUnload 手动控制
    return this.detail.createTime ? formatTime(+this.detail.createTime): '';
  }
  get money() {
    return this.detail.money.toFixed(2);
  }
  onLoad() {

  }

  onUnload() {
    this.detail = emptyRedPacketDetail;
  }
}
export default CardRedPacketDetail;

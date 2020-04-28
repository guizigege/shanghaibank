import { Vue, Component, Emit, Prop } from 'vue-property-decorator';
import {
  AuditRedPacketCard,
  emptyAuditRedPacketCard
} from '@/models/redPacket';
import { formatTime, timeAgo, isValidJSON } from '@/utils';
import { AuditData } from '@/models/bank';
import { AuditType } from '@/models/enums';
import { IconRedPacket, defaultRange } from '@/utils/consts';

@Component
class CardRedPacketInfo extends Vue {
  @Prop({ default: emptyAuditRedPacketCard }) redPacket: AuditRedPacketCard;

  iconRedPacket = IconRedPacket;

  get beginTime() {
    return this.redPacket.beginTime
      ? formatTime(+this.redPacket.beginTime)
      : '';
  }

  get timeAgo() {
    return timeAgo(this.redPacket.updateTime);
  }

  get range() {
    if (this.redPacket.extendInfo && isValidJSON(this.redPacket.extendInfo)) {
      const obj = JSON.parse(this.redPacket.extendInfo);
      return obj.condition && obj.condition.range
        ? obj.condition.range
        : defaultRange;
    }

    return defaultRange;
  }

  async onLoad() {
    //
  }

  mounted() {
    // vue hook
  }

  @Emit('click')
  navToAuditDetail(): AuditData {
    return { type: AuditType.RedPacket, info: this.redPacket };
  }
}
export default CardRedPacketInfo;

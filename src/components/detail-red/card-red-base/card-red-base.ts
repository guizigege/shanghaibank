import { Vue, Component, Prop } from 'vue-property-decorator';
import { emptyPacketInfo, PacketInfo } from '@/models/redPacket';
import { isValidJSON, formatTime } from '@/utils';
import { defaultRange } from '@/utils/consts';

@Component
class CardRedBase extends Vue {
  @Prop({ default: emptyPacketInfo }) detail: PacketInfo;

  get range() {
    if (this.detail.extendInfo && isValidJSON(this.detail.extendInfo)) {
      const obj = JSON.parse(this.detail.extendInfo);
      return obj.condition && obj.condition.range
        ? obj.condition.range
        : defaultRange;
    }

    return defaultRange;
  }

  get beginTime() {
    return this.detail.beginTime ? formatTime(+this.detail.beginTime) : '';
  }

  onLoad() {
    //
  }

  onUnload() {
    this.detail = emptyPacketInfo;
  }
}
export default CardRedBase;

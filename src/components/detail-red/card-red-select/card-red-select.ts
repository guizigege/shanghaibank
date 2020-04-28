import { Vue, Component, Prop } from 'vue-property-decorator';
import { isValidJSON } from '@/utils';
import { PacketInfo, emptyPacketInfo } from '@/models/redPacket';

@Component
class CardRedSelect extends Vue {
  @Prop({ default: emptyPacketInfo }) detail: PacketInfo;

  isEmpty = true;

  emptyInfo = {
    age: '',
    sex: '',
    marry: '',
    hobby: '',
    system: '',
    vision: '',
  };

  info = this.emptyInfo;

  onLoad() {
    if (this.detail.extendInfo && isValidJSON(this.detail.extendInfo)) {
      const obj = JSON.parse(this.detail.extendInfo);
      if (obj.condition) {
        this.info = { ...obj.condition };
        this.checkInfo();
      }
    }
  }

  onUnload() {
    this.detail = emptyPacketInfo;
    this.info = this.emptyInfo;
  }

  private checkInfo() {
    const keys = Object.keys(this.emptyInfo);
    const hasValue = keys.reduce((prev, curr) => {
      return prev || !!this.info[curr];
    }, false);
    this.isEmpty = !hasValue;
  }
}
export default CardRedSelect;

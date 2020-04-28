import { Vue, Component, Prop } from 'vue-property-decorator';
import { emptyPacketInfo, PacketInfo } from '@/models/redPacket';
import { isValidJSON } from '@/utils';
@Component
class CardRedBusiness extends Vue {
  @Prop({ default: emptyPacketInfo }) detail: PacketInfo;

  emptyProducts = [];

  get products() {
    if (this.detail.extendInfo && isValidJSON(this.detail.extendInfo)) {
      const obj = JSON.parse(this.detail.extendInfo);
      return obj.condition && obj.condition.products
        ? obj.condition.products
        : this.emptyProducts;
    }

    return this.emptyProducts;
  }

  onLoad() {
    //
  }

  onUnload() {
    this.detail = emptyPacketInfo;
  }
}
export default CardRedBusiness;

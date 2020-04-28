import { PacketInfo, emptyPacketInfo } from './../../models/redPacket';
import { Vue, Component, Prop } from 'vue-property-decorator';
import AuditAction from '@/components/audit-action/audit-action';
import CardRedBase from './card-red-base/card-red-base';
import CardRedBusiness from './card-red-business/card-red-business';
import CardRedSelect from './card-red-select/card-red-select';
import { AuditRedPacketDetail } from '@/models/redPacket';

const debug = require('@/utils/debug')('log:Detail Red');

@Component({
  components: {
    CardRedBase,
    CardRedBusiness,
    CardRedSelect,
  }
})
class DetailRed extends Vue {
  @Prop() detail: AuditRedPacketDetail;

  packetInfo: PacketInfo;

  isLoad = false;

  onLoad() {
    debug('onLoad');
    console.log('this.detail :', this.detail);
    this.packetInfo = this.detail.packet;
    this.isLoad = true;
  }

  onUnload() {
    this.packetInfo = emptyPacketInfo;
    this.isLoad = false;
  }

  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  mounted() {
    // vue hook
    debug('mounted');
  }
}
export default DetailRed;

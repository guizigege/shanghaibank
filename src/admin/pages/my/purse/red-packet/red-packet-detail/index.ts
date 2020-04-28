import { Vue, Component } from 'vue-property-decorator';
import CardRedPacketInfo from '@/components/detail-red-packet/card-red-packet-info/card-red-packet-info';
import CardBusinessInfo from '@/components/detail-red-packet/card-business-info/card-business-info';
import CardRedPacketCustomer from '@/components/detail-red-packet/card-red-packet-customer/card-red-packet-customer';
import store from '../../store';
@Component({
  components: {
    CardRedPacketInfo,
    CardBusinessInfo,
    CardRedPacketCustomer
  }
})
class DetailRedPacket extends Vue {
  get redInfo() {
    return store.state.redInfo;
  }
  get logs() {
    return store.state.logList;
  }
  get products() {
    return store.state.productList;
  }
  onLoad(options) {
    if (options.packetId) {
      store.dispatch('redInfo',options.packetId).catch(err => console.log(err));
    }
  }
}
export default DetailRedPacket;

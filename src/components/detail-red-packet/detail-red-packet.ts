import { Vue, Component } from 'vue-property-decorator';
import CardRedPacketInfo from './card-red-packet-info/card-red-packet-info';
import CardBusinessInfo from './card-business-info/card-business-info';
import CardRedPacketCustomer from './card-red-packet-customer/card-red-packet-customer';
@Component({
  components: {
    CardRedPacketInfo,
    CardBusinessInfo,
    CardRedPacketCustomer
  }
})
class DetailRedPacket extends Vue {

}
export default DetailRedPacket;

import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { formatTime } from '@/utils';
import {
  AuditRedPacketCard,
  emptyAuditRedPacketCard
} from '@/models/redPacket';
@Component({
  components: {
    //
  }
})
class CardRedPacketInfo extends Vue {
  @Prop() redPacket: any;
  @Prop() type: string;
  @Emit('toDetail') toDetail() {
    //
  }
  get sumMoney() {
    return this.redPacket.sumMoney?this.redPacket.sumMoney.toFixed(2):'0.00'
  }
  get cash() {
   if(this.redPacket.sumMoney&&this.redPacket.getMoney){
      return (this.redPacket.sumMoney-this.redPacket.getMoney).toFixed(2);
    }else{
     return '0.00'
   }
  }
  get createTime() {
    return this.redPacket.createTime
      ? formatTime(+this.redPacket.createTime)
      : '';
  }
  onShow() {
    //
  }
  mounted() {
    // vue hook
  }

}

export default CardRedPacketInfo;

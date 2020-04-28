import { Vue, Component } from 'vue-property-decorator';
import CardRedPacketDetail from '@/components/detail-red-packet/card-red-packet-detail/card-red-packet-detail';
import Empty from '@/components/empty/empty';
import service from '@/api/service/client';
import { RedPacketType } from '@/models/enums';
@Component({
  components: {
    Empty,
    CardRedPacketDetail
  }
})
class CommissionDetail extends Vue {
  list: Array<any> = [];
  loading: boolean = true;
  async onShow() {
    // 小程序 hook
    this.loading = true;
    const data = await service.redPacketDetail();
    this.loading = false;
    // this.list = data.map(item => ({ ...item, type: RedPacketType.Commission }));
    this.list = [];
  }

  mounted() {
    // vue hook
  }
}
export default CommissionDetail;

import { Vue, Component } from 'vue-property-decorator';
import CardWalletInfo from '@/components/detail-red-packet/card-wallet-info/card-wallet-info';
import Empty from '@/components/empty/empty';
import service from '@/api/service/client';


@Component({
  components: {
    CardWalletInfo,
    Empty
  }
})
class WithdrawDetail extends Vue {
  loading: boolean = true;
  list: Array<any> = [];

  async onShow() {
    // 小程序 hook
    this.loading = true;
    this.list = await service.withdrawDetail();
    // this.list = this.list.map((v)=>{
    //   if(!v.totalFee){
    //     v.totalFee = (v.money*100).toFixed(2);
    //   }
    //   if(!v.state) {
    //     v.state = (v.status===0?1:0);
    //   }
    //   return v;
    // });
    this.loading = false;
  }

  mounted() {
    // vue hook
  }
}
export default WithdrawDetail;

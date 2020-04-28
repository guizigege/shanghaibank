import { Component, Watch } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import CardBankBranch from '@/components/card-bank-branch/card-bank-branch';
import store from '../store';
import storage from '@/utils/storage';
import Empty from '@/components/empty/empty';
import { mixins } from 'vue-class-component';
import CalcDistanceMixin from '@/mixin/calcDistMixin';
import WxRouter from '@/mixin/wxRouter';

@Component({
  components: {
    CardBankBranch,
    Empty
  }
})
class VicinityBranchBank extends mixins(CalcDistanceMixin, WxRouter) {
  AppUrls = AppUrls;

  isLoad: boolean = false;

  get bankList() {
    return store.state.list.map(item => {
      const d: any = item;
      this.calcDistance(d.location)
        .then(res => {
          this.$set(d, 'dist', res);
        });
      d.ex = JSON.parse(d.extendInfo);
      d.icon = d.ex.userInfo.coverUrl || '';
      d.weekdayAmStartHour = d.ex.userInfo.weekdayAmStartHour;
      d.weekdayPmEndHour = d.ex.userInfo.weekdayPmEndHour;
      d.holidayAmStartHour = d.ex.userInfo.holidayAmStartHour;
      d.holidayPmEndHour = d.ex.userInfo.holidayPmEndHour;
      d.desc = d.ex.userInfo.abstract;
      return d;
    });
  }

  @Watch('bankList')
  change() {
    this.isLoad = false;
    this.$nextTick(() => {
      this.isLoad = true;
    });
  }

  selectItem(i) {
    storage.set('bankDetail', this.bankList[i]);
    this.navigateTo(AppUrls.COMMON_BANK_INFO);
  }
}

export default VicinityBranchBank;

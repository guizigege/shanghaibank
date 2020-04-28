import { Vue, Component, Watch } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import store from '../store';
import storage from '@/utils/storage';

@Component
class RecommendBankList extends Vue {
  AppUrls = AppUrls;

  isLoad: boolean = false;

  get bankBranchList() {
    return store.state.recommendList.map(x => x.office);
  }

  @Watch('bankBranchList')
  change() {
    this.isLoad = false;
    this.$nextTick(() => {
      this.isLoad = true;
    });
  }

  scrollItem(i) {
    storage.set('bankDetail', store.state.recommendList[i]);
    wx.navigateTo({
      url: AppUrls.COMMON_BANK_INFO
    });
  }

  jumpAll() {
    wx.navigateTo({
      url: AppUrls.CLIENT_NEAR_ALL_BANK
    });
  }
}

export default RecommendBankList;

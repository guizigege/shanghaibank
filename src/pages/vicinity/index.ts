import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import { SwiperType } from '@/models/enums';
import { handleError } from '@/utils';
import Location from '@/components/location/location';
import SearchBar from '@/components/search-bar/search-bar';
import SweiperImages from '@/components/sweiper-images/sweiper-images';
import VicinityBranchBank from './vicinity-branch-bank/vicinity-branch-bank';
import RecommendBankList from './recommend-bank-list/recommend-bank-list';
import store from './store';

@Component({
  components: {
    Location,
    SearchBar,
    SweiperImages,
    RecommendBankList,
    VicinityBranchBank
  }
})
class Index extends Vue {
  AppUrls = AppUrls;

  swiperType = SwiperType.Vicinity;

  placeholder = '找附近银行网点';

  onLoad() {
    wx.setNavigationBarTitle({ title: '附近网点' });
  }

  onSearchChanged(e) {
    this.getData({
      office: e
    });
  }

  onLocationChanged(e) {
    this.getData({
      la: e.location.lat,
      lo: e.location.lng
    });
  }

  onLoadCurrentLocation(e) {
    this.getData({
      la: e.location.lat,
      lo: e.location.lng
    });
  }

  private getData(params: {
    la?: number;
    lo?: number;
    office?: string;
  }) {
    store.dispatch('getData', params).catch(handleError);
  }
}

export default Index;

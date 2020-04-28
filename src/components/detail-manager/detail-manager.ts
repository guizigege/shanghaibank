import { Manager } from '@/models/manager';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import ManagerPhoto from './manager-photo/manager-photo';
import ManagerCoverInfo from './manager-cover-info/manager-cover-info';
import CareerHighlights from './career-highlights/career-highlights';
import PersonalView from './personal-view/personal-view';
import ManagerLife from './manager-life/manager-life';
import RecommendedProducts from './recommended-products/recommended-products';

const debug = require('@/utils/debug')('log:Component/DetailManager');

@Component({
  components: {
    ManagerPhoto,
    ManagerCoverInfo,
    CareerHighlights,
    PersonalView,
    ManagerLife,
    RecommendedProducts
  }
})
class DetailManager extends Vue {
  AppUrls = AppUrls;

  @Prop() manager: Manager;

  // 打电话
  onCallPhone() {
    //
  }

  onAddWechat() {
    //
  }

  onGoFind() {
    //
  }
  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  mounted() {
    wx.setNavigationBarTitle({ title: `${this.manager.name}` });
    console.log(this.manager);
  }
}

export default DetailManager;
